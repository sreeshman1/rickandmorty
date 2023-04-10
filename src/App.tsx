import React from 'react';
import AppWrapper from './components/App'
import Header from './components/Header'
import Section from './components/Section';
import Footer from './components/Footer';
import { useCharactersQuery } from './graphql/types';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import CharacterCardContainer from './components/CharacterCardContainer';
import { Pagination } from './components/Pagination';
import Filter from './components/Filter';

const App = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filter, setFilter] = React.useState({});
  const [filterArray, setFilterArray] = React.useState<{field:string, value:string}[]>([]);

  const { data } = useCharactersQuery({
    variables: {
      page: currentPage,
      filter: filter
    }
  });

  const updateFilter = React.useCallback((conditions: { field: string; value: string }[]) => {
    setFilterArray(conditions);
    const newFilter: { [key: string]: string } = {};
    conditions.forEach((condition) => {
      newFilter[condition.field] = condition.value;
    });
    setFilter(newFilter);
    setCurrentPage(1);
  }, [setFilter, filter, setFilterArray]);

  const onPreviousPage = React.useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }, [setCurrentPage, currentPage]);

  const onNextPage = React.useCallback(() => {
    if (data?.characters?.info?.pages && currentPage < data.characters.info.pages) {
      setCurrentPage((page) => page + 1);
    }
  }, [setCurrentPage, currentPage, data?.characters?.info?.pages]);

  if (!data || !data.characters || !data.characters.results) return null;

  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <Header>
          <h1>Rick and Morty Character Card Info</h1>
        </Header>
        <Section>
          <Filter conditions={filterArray} fields={["status", "type", "gender", "name", "species"]} onFilter={updateFilter} />
          <CharacterCardContainer characters={data.characters.results} />
          <Pagination onPreviousPage={onPreviousPage} onNextPage={onNextPage} currentPage={currentPage} totalPages={data.characters.info?.pages} />
        </Section>
        <Footer>
          <p>Created by Sreesh Manickababu </p>
        </Footer>
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
