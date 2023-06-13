import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";

// import { Container } from './styles';

export default ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {});

    const handleSubmit = async(user) => {
        if (user.id) {
            try {
                const response = apwait axios.put(
                    `https://proj-web.onrender.com/usuario/${user.id}`, {
                        nome: user.nome,
                        email: user.email,
                        avatarUrl: user.avatarUrl,
                    }
                );

                console.log(response.data);
                navigation.navigate("UserList");
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post(
                    "https://proj-web.onrender.com/usuario", {
                        nome: user.nome,
                        email: user.email,
                        avatarUrl: user.avatarUrl,
                    }
                );

                console.log(response.data);
                navigation.navigate("UserList");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return ( <
        View style = { style.form } >
        <
        Text > Nome < /Text> <
        TextInput style = { style.input }
        placeholder = "Informe o nome"
        value = { user.nome }
        onChangeText = {
            (nome) => setUser({...user, nome }) }
        />

        <
        Text > Email < /Text> <
        TextInput style = { style.input }
        placeholder = "Informe o e-mail"
        value = { user.email }
        onChangeText = {
            (email) => setUser({...user, email }) }
        />

        <
        Text > Avatar < /Text> <
        TextInput style = { style.input }
        placeholder = "Informe o link para o avatar"
        value = { user.avatarUrl }
        onChangeText = {
            (avatarUrl) => setUser({...user, avatarUrl }) }
        />

        <
        Button title = "Salvar"
        onPress = {
            () => {
                handleSubmit(user);
            }
        }
        /> <
        /View>
    );
};

const style = StyleSheet.create({
    form: {
        padding: 12,
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        marginBottom: 10,
        padding: 10,
    },
});