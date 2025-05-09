import React, {FC, useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Modal,
    TouchableWithoutFeedback
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import {AuthService} from "@/services/auth.service";
import { TicketService } from "@/services/ticket.service";
import {ITicket} from "@/types/types";

const steps = [
    { key: "description", label: "Description" },
    { key: "location", label: "Location" },
    { key: "finishDate", label: "FinishDate" },
    { key: "budget", label: "Budget" },
];

const CreateTicket: FC = () => {
    const route = useRoute();
    const {navigate} = useNavigation<TypeRootStackParamList>();
    const { subServiceId } = route.params;

    const [currentStep, setCurrentStep] = useState(0);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        location: "",
        finishDate: new Date(),
        budget: "",
    });

    const handleNext = () => {
        if (!validateField()) return;
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const validateField = () => {
        const currentKey = steps[currentStep].key;
        const value = formData[currentKey];

        if (!value || (currentKey === 'budget' && isNaN(value))) {
            alert(`Please fill in the field "${steps[currentStep].label}" correctly`);
            return false;
        }
        return true;
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowDatePicker(false);
        if (selectedDate) setFormData(prev => ({...prev, finishDate: selectedDate}));
    };

    const handleSubmit = async () => {
        try {
            const storedUser = await AuthService.getUserFromStorage();

            const requestData = {
                subType: subServiceId,
                description: formData.description,
                location: formData.location,
                finishDate: formData.finishDate.toISOString(),
                budget: Number(formData.budget),
                authorId: storedUser.id,
                ticketStatus: "O",
                createDate: new Date().toISOString(),
            };

            console.log("subType:", subServiceId);
            await TicketService.createTicket(requestData);
            alert("Application successfully sent");
            navigate("Home");
        } catch (error) {
            console.error("Error:", error);
            alert("Error when sending an application");
        }
    };

    const renderInput = () => {
        const currentKey = steps[currentStep].key;

        switch(currentKey) {
            case 'finishDate':
                return (
                    <>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowDatePicker(true)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.dateText}>
                                {formData.finishDate.toLocaleDateString()}
                            </Text>
                            <AntDesign
                                name="calendar"
                                size={24}
                                color={showDatePicker ? "#4CAF50" : "#666"}
                            />
                        </TouchableOpacity>

                        {Platform.OS === 'ios' ? (
                            <Modal
                                visible={showDatePicker}
                                transparent={true}
                                animationType="slide"
                            >
                                <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                                    <View style={styles.iosOverlay}>
                                        <View style={styles.iosPickerContainer}>
                                            <DateTimePicker
                                                value={formData.finishDate}
                                                mode="date"
                                                display="spinner"
                                                onChange={handleDateChange}
                                                minimumDate={new Date()}
                                            />
                                            <TouchableOpacity
                                                style={styles.iosCloseButton}
                                                onPress={() => setShowDatePicker(false)}
                                            >
                                                <Text style={styles.iosCloseText}>Готово</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        ) : (
                            showDatePicker && (
                                <DateTimePicker
                                    value={formData.finishDate}
                                    mode="date"
                                    display="calendar"
                                    onChange={handleDateChange}
                                    minimumDate={new Date()}
                                />
                            )
                        )}
                    </>
                );

            case 'description':
                return (
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Describe your task in detail"
                        value={formData.description}
                        onChangeText={text => setFormData(prev => ({...prev, description: text}))}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                    />
                );

            case 'budget':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the budget"
                        value={formData.budget}
                        onChangeText={text => setFormData(prev => ({...prev, budget: text}))}
                        keyboardType="numeric"
                        returnKeyType="done"
                    />
                );

            default:
                return (
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter ${steps[currentStep].label.toLowerCase()}`}
                        value={formData[currentKey]}
                        onChangeText={text => setFormData(prev => ({...prev, [currentKey]: text}))}
                    />
                );
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                {steps.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.stepIndicator,
                            currentStep >= index && styles.activeStep,
                            index === currentStep && styles.currentStep
                        ]}
                    />
                ))}
            </View>

            {/* Step Info */}
            <Text style={styles.stepTitle}>
                Шаг {currentStep + 1} из {steps.length}
            </Text>

            {/* Current Step Header */}
            <Text style={styles.header}>
                {steps[currentStep].label}
            </Text>

            {/* Input Field */}
            {renderInput()}

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
                {currentStep > 0 && (
                    <TouchableOpacity
                        style={[styles.button, styles.backButton]}
                        onPress={handleBack}
                    >
                        <Text style={styles.buttonText}>Назад</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.button, styles.nextButton]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {currentStep === steps.length - 1 ? "Send" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 25,
        backgroundColor: "#FFFFFF",
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 30,
    },
    stepIndicator: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#E0E0E0",
        marginHorizontal: 2,
    },
    activeStep: {
        backgroundColor: "#4CAF50",
    },
    currentStep: {
        backgroundColor: "#81C784",
    },
    stepTitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
        textAlign: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: "#FFF",
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    descriptionInput: {
        height: 150,
        textAlignVertical: "top",
    },
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#FFF",
        marginBottom: 25,
        minHeight: 50,
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        backgroundColor: "#E0E0E0",
    },
    nextButton: {
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    iosOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    iosPickerContainer: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    iosCloseButton: {
        padding: 15,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    iosCloseText: {
        color: "#007AFF",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default CreateTicket;