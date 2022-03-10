import { View } from 'react-native';
import { Common } from 'styles';

import Root from './src/root';

export default function App() {
    return (
        <View style={Common.flex}>
            <Root />
        </View>
    );
}
