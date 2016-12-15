import { fromJS } from 'immutable';
import { createFileList, createFile } from '../fixtures/fileAPI';
import createFormData from './createFormData';

describe('createFormData util', () => {
  it('returns FormData object with File', () => {
    const file = createFile();
    const fileList = createFileList([file]);
    const iterable = fromJS({
      bio: 'This is my bio.',
      firstname: 'John',
      image: fileList,
      lastname: 'Doe',
    });
    const formData = createFormData(iterable);

    expect(formData instanceof FormData).toBeTruthy();
    expect(formData.has('bio')).toBeTruthy();
    expect(formData.has('firstname')).toBeTruthy();
    expect(formData.has('image')).toBeTruthy();
    expect(formData.has('lastname')).toBeTruthy();
    expect(formData.get('bio')).toEqual('This is my bio.');
    expect(formData.get('firstname')).toEqual('John');
    expect(formData.get('image')).toEqual(file);
    expect(formData.get('lastname')).toEqual('Doe');
  });
});
