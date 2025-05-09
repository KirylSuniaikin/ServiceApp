import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolClientId: '3tt19t3eovrskqp93bc8vi9eeg',
                userPoolId: 'eu-north-1_q2RfMMPLp',
                loginWith: {
                    username: false,
                    email: true,
                    phone: false,
                }
            }
        }
    });
};
