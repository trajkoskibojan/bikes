import React, { Fragment } from 'react';
import Modal from 'components/Modal/Modal';
import useHttpError from 'hooks/http-error';
import { H4 } from 'components/styled';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpError(axios)

        return (
          <Fragment>
            <Modal showup={error} modalClosed={clearError}>
              {error ? <H4>{error.message}</H4> : null}
            </Modal>
            <WrappedComponent {...props} />
          </Fragment>
        );
    };
};
 
export default withErrorHandler;
