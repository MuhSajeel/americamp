import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const ReferenceItem = ({ name, email, status }) => {
  const isResponded = status !== 'awaiting';
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        flexWrap: 'wrap',
      }}
    >
      <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Text h2>{name}</Text>
        <Text style={{ fontSize: 15 }}>{email}</Text>
      </View>
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-end', marginTop: 10 }}>
        {name ? (
          <>
            <Icon
              type="font-awesome"
              name={isResponded ? 'check' : 'times'}
              size={35}
              iconStyle={{ color: isResponded ? 'green' : 'red' }}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12 }}>
                {isResponded ? 'completed' : 'awaiting response'}
              </Text>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

export { ReferenceItem };
