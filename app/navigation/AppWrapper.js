import React from 'react';
import { FirebaseProvider } from '../context/firebase-context'
import { IngredientsProvider } from '../context/ingredients-context';
import { RecipesProvider } from '../context/recipes-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { FiltersProvider } from '../context/filters-context';

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
            <FiltersProvider>
                <RecipesProvider>
                    <IngredientsProvider>
                            <PaperProvider theme={theme}>
                                {props.children}
                            </PaperProvider>
                    </IngredientsProvider>
                </RecipesProvider>
            </FiltersProvider>
        </FirebaseProvider>
    )
    
}

export default AppWrapper;