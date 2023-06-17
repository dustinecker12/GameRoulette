import { Image, ListItem } from '@rneui/base';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { getUserSummary } from '../api/STEAM_SERVER';

const FriendListItem = ({ friend }) => {
  const [friendDetails, setFriendDetails] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getUserSummary(friend.steamid, (data) => {
      setFriendDetails(data[0]);
    });
  }, []);

  if (friendDetails.steamid == undefined) {
    return <View></View>;
  } else {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          // console.log(`${friendDetails.personaname} pressed!`);
          navigation.navigate('Shared Games', friendDetails);
        }}
      >
        <ListItem key={friendDetails.steamid}>
          <Image
            source={{ uri: friendDetails.avatarfull }}
            style={styles.image}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              {friendDetails.personaname}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron iconProps={{ color: '#CED0CE', size: 24 }} />
        </ListItem>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
  },
});

export default FriendListItem;
