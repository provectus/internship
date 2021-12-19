import { IStackScreenProps } from './StackScreenProps';

export default interface IRouteProps {
    component: React.FunctionComponent<IStackScreenProps>;
    name: string;
}