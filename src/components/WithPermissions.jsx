import React from 'react';
import { roles } from '../permissions/permission';
import { useSelector } from 'react-redux';
import { getUserData } from '../store/Auth/selectors';
import { Redirect } from 'react-router-dom';

const when = (bool, value, emptyMessage) => {
  return bool ? value : emptyMessage;
};

export const userHasPermission = (userPermissions, permission) => {
  return userPermissions.includes(permission);
};

const WithPermissions = (props) => {
  const { profile, company } = useSelector(getUserData);
  const { subscriptionStatus } = company;
  const {
    checkPermissions = false,
    permissionDeniedMessage = null,
    redirect = false,
    checkSubscription = false,
    checkRole = false
  } = props;
  const { permissions } = roles[profile.role] || [];

  const hasRolePermission = userHasPermission(
    permissions,
    props.permission
  );
  const hasSubscriptionPermission = subscriptionStatus === "active";

  return (
    <>
      {checkPermissions ?
        ((checkRole && checkSubscription && hasRolePermission && hasSubscriptionPermission) ?
          props.children :
          checkRole && hasRolePermission ?
            props.children :
            checkSubscription && hasSubscriptionPermission ?
              props.children :
              redirect ? <Redirect to="/campaigns" /> : permissionDeniedMessage)
        : props.children
      }
    </>);
};

export default WithPermissions;
