import { Amplify } from 'aws-amplify';

export default defineNuxtPlugin({
  name: 'amplify',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig();

    if (import.meta.client) {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: config.public.cognitoUserPoolId,
            userPoolClientId: config.public.cognitoClientId,
            identityPoolId: config.public.cognitoIdentityPoolId,
            loginWith: {
              email: true,
              oauth: {
                domain: '',
                scopes: ['email', 'profile', 'openid'],
                redirectSignIn: ['http://localhost:3000'],
                redirectSignOut: ['http://localhost:3000'],
                responseType: 'code',
                providers: ['Google'],
              },
            },
          },
        },
        API: {
          GraphQL: {
            endpoint: config.public.appsyncEndpoint,
            defaultAuthMode: 'userPool',
            region: config.public.awsRegion,
          },
        },
        Storage: {
          S3: {
            bucket: config.public.s3BucketUploads,
            region: config.public.awsRegion,
          },
        },
      });
    }
  },
});
