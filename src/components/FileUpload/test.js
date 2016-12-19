import React from 'react';
import { shallow } from 'enzyme';
import deepMerge from 'deepmerge';
import { createFile, createFileList } from '../../fixtures/fileAPI';
import FileUpload, { backgroundStyle } from './';

describe('FileUpload component snapshot', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    window.URL = undefined; // delete window.prop doesn't work
  });

  window.URL = {
    createObjectURL: jest.fn(() => 'ecp-logo-local-url'),
  };
  const image = 'link-to-image';
  const props = {
    id: 'EditUser',
    input: { name: 'image' },
    validated: true,
  };

  it('renders preview only', () => {
    const wrapper = shallow(<FileUpload image={image} preview={true} />);

    expect(wrapper).toMatchSnapshot();
    expect(backgroundStyle(image)).toEqual({
      background: `url(${image}) center/cover no-repeat`,
    });
  });

  it('renders empty validated file upload', () => {
    const wrapper = shallow(
      <FileUpload {...props} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(backgroundStyle()).toEqual({});
  });

  it('renders validate file upload with selected image', () => {
    const fileList = createFileList();
    const newProps = deepMerge(props, {
      input: {
        value: fileList,
      },
    });
    const wrapper = shallow(
      <FileUpload {...newProps} />
    );

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(fileList[0]);
    expect(wrapper).toMatchSnapshot();
    expect(backgroundStyle(fileList)).toEqual({
      background: `url(undefined) center/cover no-repeat`,
    });
  });

  it('renders file upload with selected image with validation error', () => {
    const fileList = createFileList([createFile(2 * 1024 * 1024)]);
    const newProps = deepMerge(props, {
      input: {
        value: fileList,
      },
      meta: {
        error: 'Max. file size exceeded.',
      },
    });
    const wrapper = shallow(
      <FileUpload {...newProps} />
    );

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(fileList[0]);
    expect(wrapper).toMatchSnapshot();
    expect(backgroundStyle(fileList)).toEqual({
      background: `url(undefined) center/cover no-repeat`,
    });
  });

  it('renders validate file upload with image prepopulated from S3', () => {
    const newProps = deepMerge(props, {
      image,
    });
    const wrapper = shallow(
      <FileUpload {...newProps} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(backgroundStyle(image)).toEqual({
      background: `url(${image}) center/cover no-repeat`,
    });
  });
});
