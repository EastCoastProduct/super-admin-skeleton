import { fromJS } from 'immutable';
import { FileList, FormData, File } from 'file-api';
import createFormData from './createFormData';

describe('createFormData util', () => {
  it('returns FormData object with File', () => {
    const iterable = fromJS({
      image: new FileList(new File('./ecp-logo.png')),
      firstname: 'John',
      lastname: 'Doe',
      bio: 'This is my bio',
    });
    const formData = createFormData(iterable);

    expect(typeof formData).toEqual('object');
    expect(formData instanceof FormData).toBeTruthy();
  });
});
