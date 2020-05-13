import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {material} from 'react-native-typography';
import {styles} from './styles';
import {FAB, Appbar, Snackbar} from 'react-native-paper';
import {updateCount} from '../../actions/app';

interface PropsType {
  count: number;
  updateCount: Function;
}

const Home: React.FC<PropsType> = (props) => {
  const [snackbarVisible, setSnackBarVisible] = React.useState(false);

  const onPressAdd = () => {
    props.updateCount(props.count + 1);
  };

  const onPressDelete = () => {
    props.updateCount(0);
    setSnackBarVisible(true);
  };

  return (
    <View style={styles.root}>
      <Appbar.Header>
        <Appbar.Content title="Home" subtitle="Hello there!" />
        <Appbar.Action icon="reload" onPress={onPressDelete} />
      </Appbar.Header>
      <View style={styles.screenContainer}>
        <FAB style={styles.fab} icon="plus" onPress={onPressAdd} />
        <Text style={material.subheading}>Counter</Text>
        <Text style={material.display1}>{props.count}</Text>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        duration={1000}>
        Counter resetted!
      </Snackbar>
    </View>
  );
};

const mapStateToProps = (state) => ({
  count: state.app.count,
});

const mapDispatchToProps = {
  updateCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
