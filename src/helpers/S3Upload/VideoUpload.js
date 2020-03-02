import { RNS3 } from 'react-native-aws3';

// const options = {
//   keyPrefix: 'americamp/',
//   bucket: 'visconn-files-sharing',
//   region: 'eu-west-2',
//   accessKey: 'AKIAJH5WTUDAJKP5PKZQ',
//   secretKey: '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',
//   successActionStatus: 201,
// };
const options = {
  keyPrefix: 'americamp/',
  bucket: 'americamp-dev',
  region: 'eu-central-1',
  accessKey: 'AKIAXWEJ5E442RMIVY3N',
  secretKey: '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',
  successActionStatus: 201,
};

export const uploadVideo = file => {
  return RNS3.put(file, options);
};
