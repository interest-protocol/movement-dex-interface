import { curryN } from 'ramda';

import withParamsGuard from './with-params-guard';

const withAddressGuard = curryN(3, withParamsGuard)(['address']);

export default withAddressGuard;
