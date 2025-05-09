import React, {useEffect, useState} from 'react';
import {signUp, confirmSignUp, signIn, getCurrentUser, fetchUserAttributes, signOut} from 'aws-amplify/auth';
import {useAppDispatch, useAppSelector} from "../core/redux";
import { userSlice } from "../reducers/user-slice";
import {UserTypeEnum} from "../core/types";
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
    const [isSignUpPage, setIsSignUpPage] = useState<boolean>(false);

    const togglePage = () => {
        setIsSignUpPage(!isSignUpPage);
    };

    return (
        <div>
            {isSignUpPage ? (
                <SignUp onTogglePage={togglePage} />
            ) : (
                <SignIn onTogglePage={togglePage} />
            )}
        </div>
    );
};

interface SignInProps {
    onTogglePage: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onTogglePage }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {user, isLoading, error, isAuth} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (isAuth) {
            console.log('User slice! userId: ' + user.id + ' name: ' + user.name + 'email: ' + user.email + ' isAuth: ' + isAuth);
        }
    }, [isAuth, user]);


    const handleSignIn = async () => {
        try {
            //await signOut();
            const signInResult = await signIn({
                username: email,
                password
            });
            console.log('User signed in successfully');

            const { username, userId, signInDetails } = await getCurrentUser()
            const userAttributes = await fetchUserAttributes();
            const userTO = {
                id: userId,
                name: username,
                email: userAttributes.email,
                type: UserTypeEnum.TASKER,
                totalScore: 0,
                revCount: 0
            };
            console.log('User signed in successfully with name ' + username + ' id: ' + userId);

            dispatch(userSlice.actions.authSuccess(userTO));

            navigate("/");
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <p>
                Don't have an account?{' '}
                <span onClick={onTogglePage} style={{ color: 'blue', cursor: 'pointer' }}>
                    Sign Up here
                </span>
            </p>
        </div>
    );
};

interface SignUpProps {
    onTogglePage: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onTogglePage }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmationCode, setConfirmationCode] = useState<string>('');
    const [step, setStep] = useState<'signUp' | 'confirm'>('signUp');
    const [isSignUpComplete, setIsSignUpComplete] = useState<boolean>(false);
    const [codeDeliveryDetails, setCodeDeliveryDetails] = useState<{
        deliveryMedium: string;
        destination: string;
    } | null>(null);

    const handleSignUp = async () => {
        try {
            const signUpResult = await signUp({
                username: userName,
                password,
                options: {
                    userAttributes: {
                        email,
                        name: fullName
                    },
                },
            });

            console.log('SignUp result:', signUpResult);

            if (signUpResult.isSignUpComplete) {
                setIsSignUpComplete(true);
            } else if (signUpResult.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                setStep('confirm');

                // Проверка наличия значений, если они могут быть undefined
                const deliveryMedium = signUpResult.nextStep.codeDeliveryDetails?.deliveryMedium ?? 'N/A';
                const destination = signUpResult.nextStep.codeDeliveryDetails?.destination ?? 'N/A';

                setCodeDeliveryDetails({
                    deliveryMedium,
                    destination,
                });
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleConfirmSignUp = async () => {
        try {
            const input = {
                username: userName,
                confirmationCode,
                options: {
                    clientMetadata: {},
                },
            };

            await confirmSignUp(input);
            console.log('User confirmed');
            setIsSignUpComplete(true);
            const { username, userId, signInDetails } = await getCurrentUser()
            const userAttributes = await fetchUserAttributes();
            const userTO = {
                id: userId,
                name: username,
                email: userAttributes.email,
                type: UserTypeEnum.TASKER,
                totalScore: 0,
                revCount: 0
            };
            console.log('User signed in successfully with name ' + username + ' id: ' + userId);

            dispatch(userSlice.actions.authSuccess(userTO));

            navigate("/");
        } catch (error) {
            console.error('Error confirming sign-up:', error);
        }
    };

    return (
        <div>
            {step === 'signUp' ? (
                <div>
                    <h2>Sign Up</h2>
                    <input
                        type="username"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSignUp}>Sign Up</button>
                    {codeDeliveryDetails && (
                        <p>
                            Confirmation code sent via {codeDeliveryDetails.deliveryMedium} to {codeDeliveryDetails.destination}.
                        </p>
                    )}
                    <p>
                        Already have an account?{' '}
                        <span onClick={onTogglePage} style={{ color: 'blue', cursor: 'pointer' }}>
                            Sign In here
                        </span>
                    </p>
                </div>
            ) : (
                <div>
                    <h2>Confirm Sign Up</h2>
                    <input
                        type="text"
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                    />
                    <button onClick={handleConfirmSignUp}>Confirm</button>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
