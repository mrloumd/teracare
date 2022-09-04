/* eslint-disable camelcase */
import HTTPStatus from 'http-status';
import Sequelize from 'sequelize';

import { APIClientError } from '../helpers/APIResponse';
import { clone } from '../helpers/utils';

import wrapAsync from '../helpers/wrapAsync';
import models from '../database/models';

const Module = models.module;
const RolePermission = models.role_permission;
const UserPassword = models.user_password;

const validateExpiredPassword = async (user_id) => {
  const currentHashedPassword = clone(
    await UserPassword.findOne({
      attributes: [
        'expiration_datetime',
        [
          Sequelize.literal('IF(expiration_datetime < NOW(), true, false)'),
          'is_expired',
        ],
      ],
      where: { user_id },
      order: [['created_at', 'DESC']],
      paranoid: false,
    }),
  );

  if (!currentHashedPassword) {
    throw new APIClientError(
      {
        message: 'Password policy has been modified',
        change_password: true,
      },
      HTTPStatus.UNAUTHORIZED,
    );
  }
  if (currentHashedPassword.is_expired) {
    throw new APIClientError(
      {
        message: 'Your password is expired',
        change_password: true,
      },
      HTTPStatus.UNAUTHORIZED,
    );
  }
};

export default wrapAsync(async (req, res, next) => {
  const { role_id, id: user_id } = req.user;
  const { url, method } = req;

  // Validate password expiration
  await validateExpiredPassword(user_id);

  // Get module uri
  const uri = url.split('?')[0].split('/')[1];
  // Retrieve module
  const module = clone(await Module.findOne({ where: { uri } }));
  if (!module)
    throw new APIClientError(
      { message: 'Module not found.' },
      HTTPStatus.NOT_FOUND,
    );

  const role_permission = clone(
    await RolePermission.findOne({
      attributes: [
        'id',
        'has_create',
        'has_update',
        'has_retrieve',
        'has_export',
      ],
      where: {
        role_id,
        module_id: module.id,
      },
    }),
  );

  // Access Control Permission
  if (method === 'POST' && role_permission.has_create) return next();
  if (method === 'PUT' && role_permission.has_update) return next();
  if (method === 'GET' && url.includes('export') && role_permission.has_export)
    return next();
  if (method === 'GET' && !url.includes('export')) {
    const { acl } = req.query;
    if ((acl && acl === 'false') || role_permission.has_retrieve) return next();
  }

  // Unauthorized access
  throw new APIClientError(
    { message: 'You do not have access in this route.', auto_logout: true },
    HTTPStatus.UNAUTHORIZED,
  );
});
