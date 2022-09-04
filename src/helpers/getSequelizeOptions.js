/* eslint-disable radix */
const Sequelize = require('sequelize');

// eslint-disable-next-line no-unused-vars
const { Op } = Sequelize;

exports.getSequelizeOptions = (queryObject) => {
  const query = {
    ...queryObject,
    is_active:
      // eslint-disable-next-line no-nested-ternary
      queryObject.is_active === 'true'
        ? 1
        : queryObject.is_active === 'false'
        ? 0
        : '',
  };
  const limit = +query.limit || 10;
  const page = +query.page || 1;
  const offset = (page - 1) * limit;
  const sortBy = query.sort_by ? query.sort_by : 'created_at';
  const sortDesc = query.sort_desc ? query.sort_desc : 'ASC';

  // delete the default table filters
  delete query.sort_by;
  delete query.sort_desc;
  delete query.page;
  delete query.limit;
  delete query.global_location;
  delete query.acl;

  const where = {};
  Object.keys(query).map((item) => {
    if (query[item] !== '') {
      if (item.charAt(0) === '_') {
        // use to find strings as filter
        // eslint-disable-next-line no-param-reassign
        item = item.slice(1);
        where[item] = {
          [Op.or]: [{ [Op.like]: `%${query[`_${item}`]}%` }],
        };
      } else {
        where[item] = query[item];
      }
    }

    return null;
  });

  return {
    findOptions: {
      where,
      order: [[sortBy, sortDesc]],
      offset,
      limit,
    },
    pageOptions: {
      page,
      limit,
    },
  };
};
