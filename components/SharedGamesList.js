import { FlatList, View, StyleSheet } from 'react-native';

import SharedGamesListItem from './SharedGamesListItem';

const SharedGamesList = ({ games }) => {
  const renderSharedGamesListItem = ({ index, item }) => {
    return <SharedGamesListItem game={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderSharedGamesListItem}
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

export default SharedGamesList;
