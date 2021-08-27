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
            <RecipesProvider>
                <IngredientsProvider>
                    <FiltersProvider>
                        <PaperProvider theme={theme}>
                            {props.children}
                        </PaperProvider>
                    </FiltersProvider>
                </IngredientsProvider>
            </RecipesProvider>
        </FirebaseProvider>
    )
    
}

export default AppWrapper;