import React from 'react';
import {Controller} from 'react-hook-form';
import {IField} from "@/types/types";

const Field = <T extends Record<string, any>>({
                                                  control,
                                                  rules,
                                                  name,
                                                  ...rest
                                              }: IField<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                         field: {value, onChange, onBlur},
                         fieldState: {error},
                     }) => (
                <>
                    {/*<TextInput*/}
                    {/*    mode="outlined"*/}
                    {/*    value={value || ''}*/}
                    {/*    onChangeText={onChange}*/}
                    {/*    onBlur={onBlur}*/}
                    {/*    error={!!error}*/}
                    {/*    autoCapitalize="none"*/}
                    {/*    placeholderTextColor="#6A6A6A"*/}
                    {/*    style={{marginBottom: 8}}*/}
                    {/*/>*/}
                    {/*{error?.message && (*/}
                    {/*    <HelperText type="error" visible={!!error}>*/}
                    {/*        {error.message}*/}
                    {/*    </HelperText>*/}
                    {/*)}*/}
                </>
            )}
        />
    )
}

export default Field