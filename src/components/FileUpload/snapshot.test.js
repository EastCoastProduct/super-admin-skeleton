import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { createFile, createFileList } from '../../fixtures/fileAPI';
import FileUpload, { backgroundStyle } from './';

describe('FileUpload component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.resetAllMocks();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });
  afterAll(() => {
    window.URL = undefined; // delete window.prop doesn't work
  });

  window.URL = {
    createObjectURL: jest.fn(() => 'ecp-logo-local-url'),
  };

  it('renders preview only', () => {
    const image = 'link-to-image';
    const tree = renderer.create(
      <FileUpload image={image} preview={true} />
    );

    expect(tree.toJSON()).toMatchSnapshot()
    expect(backgroundStyle(image)).toEqual({
      background: `url(${image}) center/cover no-repeat`,
    });
  });

  it('renders empty validated file upload', () => {
    const tree = renderer.create(
      <FileUpload
        id="Form"
        input={{ name: 'image' }}
        validated={true}
      />
    );


    expect(tree.toJSON()).toMatchSnapshot();
    expect(backgroundStyle()).toEqual({});
  });
  /*
  it('renders validate file upload with selected image', () => {
    const fileList = createFileList();
    const tree = renderer.create(
      <FileUpload
        id="Form"
        input={{ name: 'image', value: fileList }}
        validated={true}
      />
    );

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(fileList[0]);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(backgroundStyle(fileList)).toEqual({
      background: `url(undefined) center/cover no-repeat`,
    });
  });

  it('renders file upload with selected image with validation error', () => {
    const fileList = createFileList([createFile(2 * 1024 * 1024)]);
    const tree = renderer.create(
      <FileUpload
        id="Form"
        input={{ name: 'image', value: fileList }}
        meta={{ error: 'Max. file size exceeded.' }}
        validated={true}
      />
    );

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(fileList[0]);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(backgroundStyle(fileList)).toEqual({
      background: `url(undefined) center/cover no-repeat`,
    });
  });

  it('renders validate file upload with image prepopulated from S3', () => {
    const image = 'link-to-image';
    const tree = renderer.create(
      <FileUpload
        id="Form"
        image={image}
        input={{ name: 'image' }}
        validated={true}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(backgroundStyle(image)).toEqual({
      background: `url(${image}) center/cover no-repeat`,
    });
  });

  */
});
