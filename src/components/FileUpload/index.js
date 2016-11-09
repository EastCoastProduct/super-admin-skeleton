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
  const { image, input: { value, ...input }, meta: { error }, preview,
    validated } = props;

  return (
    <div>
      <div
        className={css(styles.emptyImage, validated && styles.validatedImage,
          error && styles.errImage)}
        style={backgroundStyle(value || image)}
      >
        {!value && !image &&
          <i className={`${css(styles.icon)} fa fa-picture-o`} />
        }
        {!preview &&
          <label className={css(styles.button)} htmlFor={input.name}>
            Upload Photo
            <input
              className={css(styles.file)}
              id={input.name}
              type="file"
              {...input}
            />
          </label>
        }
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

FileUpload.defaultProps = {
  input: {},
  meta: {},
};

FileUpload.propTypes = {
  image: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  preview: PropTypes.bool,
  validated: PropTypes.bool,
};

export default FileUpload;
