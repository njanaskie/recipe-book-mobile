import React from 'react';
import { View } from 'react-native'
// import AppRouter from '../routers/AppRouter'
import { FirebaseProvider } from '../context/firebase-context'
import { IngredientsProvider } from '../context/ingredients-context';
import { RecipesProvider } from '../context/recipes-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { FiltersProvider } from '../context/filters-context';
// // import AppWrapper from './AppWrapper_old';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
  };

const AppWrapper = (props) => {

    return (
        <FirebaseProvider >
            <RecipesProvider>
                <IngredientsProvider>
                    <PaperProvider theme={theme}>
                        {props.children}
                    </PaperProvider>
                </IngredientsProvider>
            </RecipesProvider>
        </FirebaseProvider>
    )
    
}

export default AppWrapper;