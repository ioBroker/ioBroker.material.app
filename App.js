import React from 'react';

import { Input, Header } from 'react-native-elements';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import {WebView} from 'react-native-webview';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false,
            url: 'https://iobroker.net'
        }
    }

    renderMenu() {
        return this.state.menuOpened ? <View style={styles.settings}>
            <Header
                leftComponent={{ text: 'MY TITLE', style: { color: '#fff' }, onPress: () => this.setState({menuOpened: false})}}
                //centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'close', color: '#fff' }}
            />
            <Text>URL:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={url => this.setState({url})}
                value={this.state.url}
                placeholder="URL"
            />
            <Input
                placeholder='URL'
                leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />
            <View style={styles.separator} />
            <Button
                title="Close"
                onPress={() => this.setState({menuOpened: false})}/>
        </View> : null;
    }

    render() {
        return <View style={styles.container}>
            <WebView
                source={{uri: this.state.url}}
                style={{marginTop: 0}}
            />
            <TouchableOpacity
                style={styles.button}
                title="Open menu"
                onPress={() => this.setState({menuOpened: true})}
            >
                <Text>...</Text>
            </TouchableOpacity>
            {this.renderMenu()}
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: '100%',
        maxWidth: 400,
    },
    button: {
        backgroundColor: "#DDDDDD",
        position: 'absolute',
        bottom: 0,
        width: 30,
        height: 20,
        borderRadius: 10,
        right: 5,
        opacity: 0.5,
        zIndex: 1,
        textAlign: 'center',
    },
    webView: {
        position: 'absolute',
        zIndex: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
    },
    settings: {
        zIndex: 2,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 20,
        padding: 20,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default App;