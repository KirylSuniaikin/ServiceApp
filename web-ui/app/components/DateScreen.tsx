import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Button, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DateScreen = ({ selectedDate, onDateChange }: { selectedDate: string; onDateChange: (date: string) => void }) => {
    const [date, setDate] = useState<string>(selectedDate);
    const [showModal, setShowModal] = useState(false);

    const validateDate = (date: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
        return regex.test(date);
    };

    const handleTextInputChange = (text: string) => {
        setDate(text);
    };

    const handleDateSelection = (newDate: Date) => {
        const formattedDate = newDate.toISOString().split("T")[0];
        setDate(formattedDate);
        onDateChange(formattedDate);
        setShowModal(false);
    };

    const handleEndEditing = () => {
        if (date && !validateDate(date)) {
            Alert.alert("Ошибка", "Введите дату в формате YYYY-MM-DD");
            setDate("");
        }
    };

    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <TextInput
                style={{ flex: 1, fontSize: 16, color: "#000", borderWidth: 1, padding: 10 }}
                placeholder="Введите дату (YYYY-MM-DD)"
                value={date}
                onChangeText={handleTextInputChange}
                onEndEditing={handleEndEditing}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <FontAwesome name="calendar" size={24} color="blue" />
            </TouchableOpacity>


            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Выберите дату</Text>

                        <View style={{ marginVertical: 20 }}>
                            <Button title="Сегодня" onPress={() => handleDateSelection(new Date())} />
                            <Button title="Завтра" onPress={() => handleDateSelection(new Date(Date.now() + 86400000))} />
                        </View>

                        <Button title="Отмена" onPress={() => setShowModal(false)} color="red" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DateScreen;