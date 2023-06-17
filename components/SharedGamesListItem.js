import { ListItem } from '@rneui/base';
import { Pressable, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

const SharedGamesListItem = ({ game }) => {
  const [gameDetails, setGameDetails] = useState({});
  const navigation = useNavigation;

  useEffect(() => {
    // search my firestore for game details
    // if they don't exist, search steamAPI
    // save the game details to my firestore
    // do all of this in the fb-methods and STEAM_SERVER methods
    // call setGameDetails
  }, []);

  if (game.appid == undefined) {
    return <View></View>;
  } else {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          Alert.alert(`You have ${game.name} in common!`);
        }}
      >
        <ListItem key={game.appid}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{game.name}</ListItem.Title>
            {/* <ListItem.Subtitle style={styles.subtitle}>
              Playtime: {Math.floor(game.playtime_forever / 60)} hours{' '}
              {game.playtime_forever % 60} minutes
            </ListItem.Subtitle> */}
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
  title: {
    fontSize: 22,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SharedGamesListItem;
