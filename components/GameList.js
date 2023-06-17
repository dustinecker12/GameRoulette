import { FlatList, View, StyleSheet } from 'react-native';

import GameListItem from './GameListItem';

const GameList = ({ games }) => {
  const renderGameListItem = ({ index, item }) => {
    return <GameListItem game={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderGameListItem}
        keyExtractor={(item) => item.appid}
        extraData={games}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default GameList;
