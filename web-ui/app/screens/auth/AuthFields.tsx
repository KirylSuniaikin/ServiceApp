import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Field from '@/field/Field';
import { Control } from 'react-hook-form';

interface IAuthFields {
    control: Control<any>;
    isReg: boolean;
    isConfirming: boolean;
}

const AuthFields: FC<IAuthFields> = ({ control, isReg, isConfirming }) => {
    return (
        <View style={styles.container}>
            {isConfirming ? (
                <Field
                    placeholder="Enter confirmation code"
                    control={control}
                    name="code"
                    rules={{
                        required: 'Confirmation code is required',
                    }}
                    keyboardType="number-pad"
                    style={styles.input}
                />
            ) : (
                <>
                    {isReg && (
                        <Field
                            placeholder="Enter full name"
                            control={control}
                            name="fullName"
                            rules={{
                                required: 'Full name is required',
                            }}
                            style={styles.input}
                        />
                    )}
                    {isReg && (
                        <Field
                            placeholder="Enter username"
                            control={control}
                            name="username"
                            rules={{
                                required: 'Username is required',
                            }}
                            style={styles.input}
                        />
                    )}
                    <Field
                        placeholder="Enter email"
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        }}
                        keyboardType="email-address"
                        style={styles.input}
                    />
                    <Field
                        placeholder="Enter password"
                        control={control}
                        name="password"
                        secureTextEntry
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password should be at least 6 characters long',
                            },
                        }}
                        style={styles.input}
                    />
                    {isReg && (
                        <Field
                            placeholder="Confirm password"
                            control={control}
                            name="confirmPassword"
                            secureTextEntry
                            rules={{
                                required: 'Password confirmation is required',
                                validate: (value, formValues) =>
                                    value === formValues.password || 'Passwords do not match',
                            }}
                            style={styles.input}
                        />
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 16,
    },
});

export default AuthFields;