import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import { BytesLike as Arrayish, BigNumber, BigNumberish, ContractInterface, ContractTransaction } from 'ethers';

export type ContractContext = EthersContractContextV5<
  EverclubContract,
  EverclubContractMethodNames,
  EverclubContractEventsContext,
  EverclubContractEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type EverclubContractEvents =
  | 'MissedEthPayment'
  | 'NewUserPlace'
  | 'ReferrerPaymentTransfer'
  | 'RegisteredByReferrer'
  | 'Registration'
  | 'Reinvest'
  | 'Upgrade';
export interface EverclubContractEventsContext {
  MissedEthPayment(...parameters: any): EventFilter;
  NewUserPlace(...parameters: any): EventFilter;
  ReferrerPaymentTransfer(...parameters: any): EventFilter;
  RegisteredByReferrer(...parameters: any): EventFilter;
  Registration(...parameters: any): EventFilter;
  Reinvest(...parameters: any): EventFilter;
  Upgrade(...parameters: any): EventFilter;
}
export type EverclubContractMethodNames =
  | 'new'
  | 'LAST_PLATFORM'
  | 'PLATFORM_COMMISSION_ACTIVE_PERCENT'
  | 'PLATFORM_COMMISSION_BUY_PERCENT'
  | 'START_PLATFORM'
  | 'addressIds'
  | 'buyNewLevel'
  | 'findReferrer'
  | 'isUserPlatformFilled'
  | 'levelQueueUser'
  | 'nextUserId'
  | 'platformPricesActive'
  | 'platformPricesBuy'
  | 'platformPricesUnActive'
  | 'reactivatePlatform'
  | 'registrationExt'
  | 'userActivePlatform'
  | 'userExists'
  | 'userPlatformMembersCount'
  | 'users'
  | 'usersMatrix';
export interface MissedEthPaymentEventEmittedResponse {
  receiver: string;
  from: string;
  platform: BigNumberish;
}
export interface NewUserPlaceEventEmittedResponse {
  user: string;
  owner: string;
  platform: BigNumberish;
  place: BigNumberish;
}
export interface ReferrerPaymentTransferEventEmittedResponse {
  buyReceiver: string;
  buyAmount: BigNumberish;
  activateReceiver: string;
  activateAmount: BigNumberish;
  feeReceiver: string;
  fee: BigNumberish;
}
export interface RegisteredByReferrerEventEmittedResponse {
  user: string;
  referrer: string;
}
export interface RegistrationEventEmittedResponse {
  user: string;
  referrer: string;
  userId: BigNumberish;
  referrerId: BigNumberish;
  amount: BigNumberish;
}
export interface ReinvestEventEmittedResponse {
  user: string;
  currentReferrer: string;
  caller: string;
  platform: BigNumberish;
}
export interface UpgradeEventEmittedResponse {
  user: string;
  referrer: string;
  platform: BigNumberish;
}
export interface LevelQueueUserResponse {
  result0: string;
  0: string;
  result1: boolean;
  1: boolean;
  length: 2;
}
export interface UsersResponse {
  id: BigNumber;
  0: BigNumber;
  referrer: string;
  1: string;
  parentsCount: BigNumber;
  2: BigNumber;
  exists: boolean;
  3: boolean;
  length: 4;
}
export interface UsersMatrixResponse {
  result0: string;
  0: string;
  result1: string[];
  1: string[];
  result2: boolean;
  2: boolean;
  result3: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface EverclubContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _treasury Type: address, Indexed: false
   */
  'new'(_treasury: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  LAST_PLATFORM(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PLATFORM_COMMISSION_ACTIVE_PERCENT(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PLATFORM_COMMISSION_BUY_PERCENT(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  START_PLATFORM(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  addressIds(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param platform Type: uint8, Indexed: false
   */
  buyNewLevel(platform: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   * @param platform Type: uint8, Indexed: false
   */
  findReferrer(user: string, platform: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   * @param platform Type: uint256, Indexed: false
   */
  isUserPlatformFilled(user: string, platform: BigNumberish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param platform Type: uint256, Indexed: false
   * @param position Type: uint256, Indexed: false
   */
  levelQueueUser(
    platform: BigNumberish,
    position: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<LevelQueueUserResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  nextUserId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   */
  platformPricesActive(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   */
  platformPricesBuy(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   */
  platformPricesUnActive(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param platform Type: uint8, Indexed: false
   */
  reactivatePlatform(platform: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param referrer Type: address, Indexed: false
   */
  registrationExt(referrer: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   * @param platform Type: uint256, Indexed: false
   */
  userActivePlatform(user: string, platform: BigNumberish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  userExists(user: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   * @param platform Type: uint256, Indexed: false
   */
  userPlatformMembersCount(user: string, platform: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  users(parameter0: string, overrides?: ContractCallOverrides): Promise<UsersResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   * @param platform Type: uint8, Indexed: false
   */
  usersMatrix(user: string, platform: BigNumberish, overrides?: ContractCallOverrides): Promise<UsersMatrixResponse>;
}
