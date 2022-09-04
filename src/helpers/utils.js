/* eslint-disable camelcase */
import HTTPStatus from 'http-status';
import Sequelize, { Op } from 'sequelize';
import moment from 'moment';

import { APIClientError } from './APIResponse';
import models from '../database/models';

export const capitalize = (string) =>
  string
    .toLowerCase()
    .split(/[ _]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

export const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const validatePK = async (table, id, options = null) => {
  const data = await models[table].findByPk(id, options);

  if (!data) {
    throw new APIClientError(
      {
        message: `${capitalize(table)} not found`,
      },
      HTTPStatus.NOT_FOUND,
    );
  }
  if (data.status === 'INACTIVE') {
    throw new APIClientError({
      message: `${capitalize(table)} is inactive`,
    });
  }
  return clone(data);
};

export const validatePrimaryField = async (
  table,
  key,
  value,
  options = null,
  throw_err = true,
) => {
  const data = await models[table].findOne({
    where: { [key]: value },
    ...options,
  });
  if (!data) {
    if (throw_err) {
      throw new APIClientError(
        {
          message: `${capitalize(table)} not found`,
        },
        HTTPStatus.NOT_FOUND,
      );
    } else return false;
  }
  if (data.status === 'INACTIVE') {
    throw new APIClientError({
      message: `${capitalize(table)} is inactive`,
    });
  }
  return clone(data);
};

// return array of model attributes
export const getRawAttributes = (table) =>
  models[table] ? Object.keys(models[table].rawAttributes) : [];

// return array of model associations
export const getAssociatedTables = (table) =>
  models[table]
    ? Object.values(models[table].associations).map(
        (assoc_table) => assoc_table.options.name.singular,
      )
    : [];

// filter out columns that do not belong to the main table/model
// returns an object
export const filterQueryAttribute = (table, query) => {
  const newQuery = {};
  const modelAttributes = getRawAttributes(table);
  const keywordExceptions = ['sort_by', 'sort_desc', 'page', 'limit'];
  Object.keys(query).map((attribute) => {
    if (
      (attribute.charAt(0) === '_' &&
        modelAttributes.includes(attribute.slice(1))) ||
      modelAttributes.includes(attribute)
    ) {
      newQuery[attribute] = query[attribute];
    } else if (keywordExceptions.includes(attribute))
      newQuery[attribute] = query[attribute];
    return attribute;
  });
  return newQuery;
};

// generate raw mysql filter base on columns in the table
export const generateWhere = (table, query) => {
  const newQuery = [];
  const modelAttributes = getRawAttributes(table);
  Object.keys(query).map((attribute) => {
    if (query[attribute]) {
      if (attribute.charAt(0) === '_') {
        const column = attribute.slice(1);
        if (modelAttributes.includes(column)) {
          newQuery.push(`${table}.${column} LIKE '%${query[attribute]}%'`);
        }
      } else if (modelAttributes.includes(attribute)) {
        newQuery.push(`${table}.${attribute} = '${query[attribute]}'`);
      }
    }
    return attribute;
  });
  return newQuery;
};

// use the corresponding column in table/model
// returns an object
export const filterDashboardAttribute = (table, query) => {
  const baseQuery = {}; // removed dashboard_ keyword
  Object.keys(query).map((attribute) => {
    if (attribute.includes('dashboard'))
      baseQuery[attribute.replace('dashboard_', '')] = query[attribute];
    return true;
  });
  return filterQueryAttribute(table, baseQuery);
};

// format to sequelize filter
export const sequelizeDateFilter = (column, startDate, endDate) =>
  Sequelize.where(Sequelize.fn('DATE', Sequelize.col(column)), {
    [Op.between]: [
      Sequelize.fn('DATE', startDate),
      Sequelize.fn('DATE', endDate),
    ],
  });

export const randomString = (length, secured = false) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let l = length || 32;
  let str = '';

  // eslint-disable-next-line no-plusplus
  while (l--) {
    // eslint-disable-next-line no-bitwise
    str += possible.charAt(~~(Math.random() * 62));
  }

  if (secured) {
    str += `Aa1!`;
  }

  return str;
};

export const isMilitaryTime = (time) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!regex.test(time)) return false;
  return true;
};

export const timeDiff = (a, b) => {
  const time1 = moment(a, 'HH:mm');
  const time2 = moment(b, 'HH:mm');
  const hours = time1.diff(time2, 'hours');
  const mins = moment(time1.diff(time2)).format('mm');
  return moment(`${hours}:${mins}`, 'HH:mm').format('HH:mm');
};

export const getAttributes = (model, acl) => {
  if (acl === 'false') return model.filter_attributes || [];
  return {};
};

export const convertTimeToCron = (militaryTime) => {
  if (isMilitaryTime(militaryTime)) {
    const time = militaryTime.replace(/\s+/g, '').split(':');
    return `0 ${time[1]} ${time[0]} * * *`;
  }
  return null;
};
