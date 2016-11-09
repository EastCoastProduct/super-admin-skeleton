import React from 'react';
import renderer from 'react-test-renderer';
import { FileList, File } from 'file-api';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import FileUpload from './';

describe('FileUpload component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    delete global.URL;
  });

  it('renders preview only', () => {
    const tree = renderer.create(
      <FileUpload image="link-to-image" preview={true} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders empty validated file upload', () => {
    const tree = renderer.create(
      <FileUpload
        input={{ name: 'image' }}
        validated={true}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders validate file upload with selected image', () => {
    global.URL = { createObjectURL: jest.fn(() => 'ecp-logo-local-url') };
    const file = new FileList(new File('./ecp-logo.png'));
    const tree = renderer.create(
      <FileUpload
        input={{ name: 'image', value: file }}
        validated={true}
      />
    );

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file[0]);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders file upload with selected image with validation error', () => {
    global.URL = { createObjectURL: jest.fn(() => 'ecp-logo-local-url') };
    const file = new FileList(new File('./ecp-logo.png'));
    const tree = renderer.create(
      <FileUpload
        input={{ name: 'image', value: file }}
        meta={{ error: 'Max. file size exceeded.' }}
      />
    );

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file[0]);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders validate file upload with image prepopulated from S3', () => {
    const tree = renderer.create(
      <FileUpload
        image="link-to-image"
        input={{ name: 'image' }}
        validated={true}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
