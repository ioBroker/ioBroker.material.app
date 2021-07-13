import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStateLocal(events, nameEvents) {
  const [state, setState] = React.useState(events);

  React.useEffect(() => {
    AsyncStorage.getItem(nameEvents).then((data) => {
      if (data) {
        setState(JSON.parse(data));
      }
    });
  }, []);

  const eventsToInstall = (newHeadCells) => {
    AsyncStorage.setItem(nameEvents, JSON.stringify(newHeadCells));
    setState(newHeadCells);
  };
  return [state, eventsToInstall];
}
