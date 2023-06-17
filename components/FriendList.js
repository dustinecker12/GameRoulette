import { FlatList, View, StyleSheet } from 'react-native';

import FriendListItem from './FriendListItem';

const FriendList = ({ friends }) => {
  const renderFriendListItem = ({ index, item }) => {
    return <FriendListItem friend={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderFriendListItem}
        keyExtractor={(item) => item.steamid}
        extraData={friends}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default FriendList;
