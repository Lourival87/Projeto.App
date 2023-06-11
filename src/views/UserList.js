import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl } from "react-native";
import { ListItem, Avatar, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

// import { Container } from './styles';

export default (props) => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://proj-web.onrender.com");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletion = async (user) => {
    try {
      await axios.delete(`https://proj-web.onrender.com/usuario/${user.id}`);
      console.log("Usuário excluído com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDeletion = (user) => {
    Alert.alert("Excluir usuário", "Deseja excluir o usuário?", [
      {
        text: "Sim",
        onPress() {
          handleDeletion(user);
        },
      },
      {
        text: "Não",
      },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  function getUserItem({ item: user }) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm", user)}
      >
        <Avatar source={{ uri: user.avatarUrl }} />

        <ListItem.Content>
          <ListItem.Title>{user.nome}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </ListItem>
    );
  }

  fetchUsers();

  return (
    <FlatList
      keyExtractor={(user) => user.id.toString()}
      data={users}
      renderItem={getUserItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};
