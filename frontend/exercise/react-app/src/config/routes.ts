import IRouteProps from '../library/RouteProps';
import DisplayScreen from '../screens/DisplayScreen';
import AddScreen from '../screens/AddScreen';
import HomeScreen from '../screens/Home';
import UpdateScreen from '../screens/UpdateScreen';
import StatsByMonthScreen from '../screens/StatsByMonthScreen';
import StatsByCategoryScreen from '../screens/StatsByCategoryScreen';

const routes: IRouteProps[] = [
    {
        name: 'Home',
        component: HomeScreen
    },
    {
        name: 'Display',
        component: DisplayScreen
    },
    {
        name: 'Add',
        component: AddScreen
    },
    {
        name: 'Update',
        component: UpdateScreen
    },
    {
        name: 'StatsM',
        component: StatsByMonthScreen
    }
    ,
    {
        name: 'StatsC',
        component: StatsByCategoryScreen
    }
];

export default routes;