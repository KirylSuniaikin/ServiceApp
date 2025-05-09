import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
Amplify.configure({
        Auth: {
            Cognito: {
                userPoolClientId: '3tt19t3eovrskqp93bc8vi9eeg',
                userPoolId: 'eu-north-1_q2RfMMPLp',
                authenticationFlowType: 'USER_PASSWORD_AUTH',
                loginWith: {
                    username: false,
                    email: true,
                    phone: false,
                    oauth: {
                        domain: 'service.auth.eu-north-1.amazoncognito.com',
                        scopes: ['openid','email','profile', 'aws.cognito.signin.user.admin'],
                        redirectSignIn: ['http://localhost:3000/'],
                        redirectSignOut: ['http://localhost:3000/'],
                        responseType: 'code',
                        providers: ['Google'],
                    }
                }
            },
        },
    Logging: {
            logLevel: 'DEBUG',
        }
    });
};

