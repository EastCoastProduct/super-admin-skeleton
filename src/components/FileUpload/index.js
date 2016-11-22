import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import ErrorMsg from '../ErrorMsg';
import styles from './styles';

const backgroundStyle = (value) => {
  if (!value) return {};
  const url = value instanceof FileList ? URL.createObjectURL(value[0]) : value;
  return {
    background: `url(${url}) center/cover no-repeat`,
  };
};

const FileUpload = (props) => {
  const { id, image, input: { value, ...input }, meta: { error }, preview,
    validated } = props;

  return (
    <div
      className={css(styles.holder, validated && styles.validatedHolder,
        error && styles.errHolder)}
    >
      <div
        className={css(styles.emptyImage)}
        style={backgroundStyle(value || image)}
      >
        {!value && !image &&
          <i className={`${css(styles.icon)} fa fa-picture-o`} />
        }
        {!preview &&
          <label className={css(styles.button)} htmlFor={`${id}-${input.name}`}>
            Upload Photo
            <input
              className={css(styles.file)}
              id={`${id}-${input.name}`}
              type="file"
              {...input}
            />
          </label>
        }
      </div>
      {error && <ErrorMsg className={styles.error}>{error}</ErrorMsg>}
    </div>
  );
};

FileUpload.defaultProps = {
  input: {},
  meta: {},
};

FileUpload.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  preview: PropTypes.bool,
  validated: PropTypes.bool,
};

export default FileUpload;
