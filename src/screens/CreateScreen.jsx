import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const CreateScreen = ({ data, setdata }) => {
    const [itemName, setitemName] = useState("");
    const [stockAmt, setstockAmt] = useState("");
    const [isEdit, setisEdit] = useState(false);
    const [editItemId, seteditItemId] = useState(null);

    const addItemHandler = () => {
        if (!itemName || !stockAmt) return; // Prevent empty inputs

        const newItem = {
            id: Date.now(),
            name: itemName,
            stock: Number(stockAmt)
        };

        setdata([...data, newItem]);

        // Clear input fields
        setitemName("");
        setstockAmt("");
    };

    const deleteHandlerItem = (id) => {
        setdata(data.filter((item) => item.id !== id));
    };

    const editHandlerItem = (item) => {
        setitemName(item.name);
        setstockAmt(item.stock.toString()); // Convert to string for input
        setisEdit(true);
        seteditItemId(item.id);
    };

    const updateItemHandler = () => {
        if (!itemName || !stockAmt) return;

        setdata((prevData) =>
            prevData.map((item) =>
                item.id === editItemId ? { ...item, name: itemName, stock: Number(stockAmt) } : item
            )
        );

        // Reset after editing
        setisEdit(false);
        seteditItemId(null);
        setitemName("");
        setstockAmt("");
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter any item name.."
                placeholderTextColor="#999"
                style={styles.input}
                value={itemName}
                onChangeText={setitemName}
            />
            <TextInput
                placeholder="Enter stock amount..."
                placeholderTextColor="#999"
                style={styles.input}
                value={stockAmt}
                keyboardType="numeric"
                onChangeText={setstockAmt}
            />

            <Pressable style={styles.button} onPress={() => (isEdit ? updateItemHandler() : addItemHandler())}>
                <Text style={styles.btnTxt}>{isEdit ? "EDIT ITEM" : "ADD ITEM"}</Text>
            </Pressable>

            <View style={{ marginTop: 10 }}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Available Items</Text>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()} // Convert ID to string
                    renderItem={({ item }) => (
                        <View style={[styles.itemContainer, { backgroundColor: item.stock < 20 ? "#FFCCCC" : "aqua" }]}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                <Text style={styles.itemText}>{item.stock}</Text>
                                <Pressable onPress={() => editHandlerItem(item)}>
                                    <Text style={styles.itemText}>Edit</Text>
                                </Pressable>
                                <Pressable onPress={() => deleteHandlerItem(item.id)}>
                                    <Text style={styles.itemText}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{ gap: 10 }}
                />
            </View>
        </View>
    );
};

export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: "4%",
        gap: 10,
    },
    input: {
        borderWidth: 1.5,
        borderColor: "green",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
    },
    button: {
        backgroundColor: "green",
        borderWidth: 1.5,
        borderColor: "green",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    btnTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    headingText: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 10,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
    },
    itemText: {
        fontSize: 15,
        fontWeight: "400",
    },
});
