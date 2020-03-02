import { RNS3 } from 'react-native-aws3';

const options = {
  keyPrefix: 'americamp/',
  bucket: 'americamp-dev',
  region: 'eu-central-1',
  accessKey: 'AKIAXWEJ5E442RMIVY3N',
  secretKey: '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',
  successActionStatus: 201,
};

export const uploadImage = file => {
  return RNS3.put(file, options);
};
