import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';



const Home = () => {
  const [view, setview] = useState(0);
  const [data, setdata] = useState([
    {id:1, name: "Wheat", stock: 5, unit:"kg"},
    {id:2, name: "Rice", stock: 15, unit:"kg"},
    {id:3, name: "Bhasmati Rice", stock: 29, unit:"kg"},
    {id:4, name: "Pulse", stock: 50, unit:"kg"},
    {id:5, name: "Corn", stock: 19, unit:"kg"},
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button , view === 0 ? {backgroundColor:"green"} : null]} onPress={() => setview(0)}>
          <Text style={[styles.btnText,  view === 0 ? {color:"white"} : null]}>All Items</Text>
        </Pressable>
        <Pressable style={[styles.button , view === 1? {backgroundColor:"green"} : null]} onPress={() => setview(1)}>
          <Text style={[styles.btnText,  view === 1 ? {color:"white"} : null]}>Low Stock</Text>
        </Pressable>
        <Pressable style={[styles.button , view === 2 ? {backgroundColor:"green"} : null]} onPress={() => setview(2)}>
          <Text style={[styles.btnText,  view === 2 ? {color:"white"} : null]}>Create</Text>
        </Pressable>
      </View>

      {/* Render components based on view state */}
      {view === 0 && <AllItems data={data} />}
      {view === 1 && <AllItems data={data.filter((item) => item.stock<20)}/>}
      {view === 2 && <CreateScreen data={data} setdata={setdata} />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "4%",
    backgroundColor: "white"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "green",
  },
  btnText: {
    color: "green",
    fontSize: 16,
  }
});
