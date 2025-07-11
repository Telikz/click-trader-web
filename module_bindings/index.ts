// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  ConnectionId,
  DbConnectionBuilder,
  DbConnectionImpl,
  DbContext,
  ErrorContextInterface,
  Event,
  EventContextInterface,
  Identity,
  ProductType,
  ProductTypeElement,
  ReducerEventContextInterface,
  SubscriptionBuilderImpl,
  SubscriptionEventContextInterface,
  SumType,
  SumTypeVariant,
  TableCache,
  TimeDuration,
  Timestamp,
  deepEqual,
} from "@clockworklabs/spacetimedb-sdk";

// Import and reexport all reducer arg types
import { AddUpgrade } from "./add_upgrade_reducer.ts";
export { AddUpgrade };
import { BuyUpgrade } from "./buy_upgrade_reducer.ts";
export { BuyUpgrade };
import { CreateStock } from "./create_stock_reducer.ts";
export { CreateStock };
import { CreateTransaction } from "./create_transaction_reducer.ts";
export { CreateTransaction };
import { IdentityConnected } from "./identity_connected_reducer.ts";
export { IdentityConnected };
import { IdentityDisconnected } from "./identity_disconnected_reducer.ts";
export { IdentityDisconnected };
import { IncreaseMoney } from "./increase_money_reducer.ts";
export { IncreaseMoney };
import { SetName } from "./set_name_reducer.ts";
export { SetName };
import { UpdatePlayers } from "./update_players_reducer.ts";
export { UpdatePlayers };
import { UpdateStockPrices } from "./update_stock_prices_reducer.ts";
export { UpdateStockPrices };
import { UpdateTransactions } from "./update_transactions_reducer.ts";
export { UpdateTransactions };

// Import and reexport all table handle types
import { MarketConfigTableHandle } from "./market_config_table.ts";
export { MarketConfigTableHandle };
import { PlayerTableHandle } from "./player_table.ts";
export { PlayerTableHandle };
import { StockTableHandle } from "./stock_table.ts";
export { StockTableHandle };
import { StockMarketScheduleTableHandle } from "./stock_market_schedule_table.ts";
export { StockMarketScheduleTableHandle };
import { TransactionTableHandle } from "./transaction_table.ts";
export { TransactionTableHandle };
import { UpdatePlayerScheduleTableHandle } from "./update_player_schedule_table.ts";
export { UpdatePlayerScheduleTableHandle };
import { UpgradesTableHandle } from "./upgrades_table.ts";
export { UpgradesTableHandle };

// Import and reexport all types
import { MarketConfig } from "./market_config_type.ts";
export { MarketConfig };
import { Player } from "./player_type.ts";
export { Player };
import { Stock } from "./stock_type.ts";
export { Stock };
import { StockMarketSchedule } from "./stock_market_schedule_type.ts";
export { StockMarketSchedule };
import { StockType } from "./stock_type_type.ts";
export { StockType };
import { Transaction } from "./transaction_type.ts";
export { Transaction };
import { TransactionStatus } from "./transaction_status_type.ts";
export { TransactionStatus };
import { TransactionType } from "./transaction_type_type.ts";
export { TransactionType };
import { UpdatePlayersSchedule } from "./update_players_schedule_type.ts";
export { UpdatePlayersSchedule };
import { Upgrades } from "./upgrades_type.ts";
export { Upgrades };

const REMOTE_MODULE = {
  tables: {
    market_config: {
      tableName: "market_config",
      rowType: MarketConfig.getTypeScriptAlgebraicType(),
    },
    player: {
      tableName: "player",
      rowType: Player.getTypeScriptAlgebraicType(),
      primaryKey: "identity",
    },
    stock: {
      tableName: "stock",
      rowType: Stock.getTypeScriptAlgebraicType(),
      primaryKey: "id",
    },
    stock_market_schedule: {
      tableName: "stock_market_schedule",
      rowType: StockMarketSchedule.getTypeScriptAlgebraicType(),
      primaryKey: "id",
    },
    transaction: {
      tableName: "transaction",
      rowType: Transaction.getTypeScriptAlgebraicType(),
      primaryKey: "id",
    },
    update_player_schedule: {
      tableName: "update_player_schedule",
      rowType: UpdatePlayersSchedule.getTypeScriptAlgebraicType(),
      primaryKey: "id",
    },
    upgrades: {
      tableName: "upgrades",
      rowType: Upgrades.getTypeScriptAlgebraicType(),
      primaryKey: "id",
    },
  },
  reducers: {
    add_upgrade: {
      reducerName: "add_upgrade",
      argsType: AddUpgrade.getTypeScriptAlgebraicType(),
    },
    buy_upgrade: {
      reducerName: "buy_upgrade",
      argsType: BuyUpgrade.getTypeScriptAlgebraicType(),
    },
    create_stock: {
      reducerName: "create_stock",
      argsType: CreateStock.getTypeScriptAlgebraicType(),
    },
    create_transaction: {
      reducerName: "create_transaction",
      argsType: CreateTransaction.getTypeScriptAlgebraicType(),
    },
    identity_connected: {
      reducerName: "identity_connected",
      argsType: IdentityConnected.getTypeScriptAlgebraicType(),
    },
    identity_disconnected: {
      reducerName: "identity_disconnected",
      argsType: IdentityDisconnected.getTypeScriptAlgebraicType(),
    },
    increase_money: {
      reducerName: "increase_money",
      argsType: IncreaseMoney.getTypeScriptAlgebraicType(),
    },
    set_name: {
      reducerName: "set_name",
      argsType: SetName.getTypeScriptAlgebraicType(),
    },
    update_players: {
      reducerName: "update_players",
      argsType: UpdatePlayers.getTypeScriptAlgebraicType(),
    },
    update_stock_prices: {
      reducerName: "update_stock_prices",
      argsType: UpdateStockPrices.getTypeScriptAlgebraicType(),
    },
    update_transactions: {
      reducerName: "update_transactions",
      argsType: UpdateTransactions.getTypeScriptAlgebraicType(),
    },
  },
  // Constructors which are used by the DbConnectionImpl to
  // extract type information from the generated RemoteModule.
  //
  // NOTE: This is not strictly necessary for `eventContextConstructor` because
  // all we do is build a TypeScript object which we could have done inside the
  // SDK, but if in the future we wanted to create a class this would be
  // necessary because classes have methods, so we'll keep it.
  eventContextConstructor: (imp: DbConnectionImpl, event: Event<Reducer>) => {
    return {
      ...(imp as DbConnection),
      event
    }
  },
  dbViewConstructor: (imp: DbConnectionImpl) => {
    return new RemoteTables(imp);
  },
  reducersConstructor: (imp: DbConnectionImpl, setReducerFlags: SetReducerFlags) => {
    return new RemoteReducers(imp, setReducerFlags);
  },
  setReducerFlagsConstructor: () => {
    return new SetReducerFlags();
  }
}

// A type representing all the possible variants of a reducer.
export type Reducer = never
| { name: "AddUpgrade", args: AddUpgrade }
| { name: "BuyUpgrade", args: BuyUpgrade }
| { name: "CreateStock", args: CreateStock }
| { name: "CreateTransaction", args: CreateTransaction }
| { name: "IdentityConnected", args: IdentityConnected }
| { name: "IdentityDisconnected", args: IdentityDisconnected }
| { name: "IncreaseMoney", args: IncreaseMoney }
| { name: "SetName", args: SetName }
| { name: "UpdatePlayers", args: UpdatePlayers }
| { name: "UpdateStockPrices", args: UpdateStockPrices }
| { name: "UpdateTransactions", args: UpdateTransactions }
;

export class RemoteReducers {
  constructor(private connection: DbConnectionImpl, private setCallReducerFlags: SetReducerFlags) {}

  addUpgrade(identifier: string, title: string, description: string, level: number, cost: bigint, passiveIncomeBonus: bigint | undefined, clickPowerBonus: bigint | undefined, clickTimerBonus: bigint | undefined) {
    const __args = { identifier, title, description, level, cost, passiveIncomeBonus, clickPowerBonus, clickTimerBonus };
    let __writer = new BinaryWriter(1024);
    AddUpgrade.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("add_upgrade", __argsBuffer, this.setCallReducerFlags.addUpgradeFlags);
  }

  onAddUpgrade(callback: (ctx: ReducerEventContext, identifier: string, title: string, description: string, level: number, cost: bigint, passiveIncomeBonus: bigint | undefined, clickPowerBonus: bigint | undefined, clickTimerBonus: bigint | undefined) => void) {
    this.connection.onReducer("add_upgrade", callback);
  }

  removeOnAddUpgrade(callback: (ctx: ReducerEventContext, identifier: string, title: string, description: string, level: number, cost: bigint, passiveIncomeBonus: bigint | undefined, clickPowerBonus: bigint | undefined, clickTimerBonus: bigint | undefined) => void) {
    this.connection.offReducer("add_upgrade", callback);
  }

  buyUpgrade(upgradeId: number) {
    const __args = { upgradeId };
    let __writer = new BinaryWriter(1024);
    BuyUpgrade.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("buy_upgrade", __argsBuffer, this.setCallReducerFlags.buyUpgradeFlags);
  }

  onBuyUpgrade(callback: (ctx: ReducerEventContext, upgradeId: number) => void) {
    this.connection.onReducer("buy_upgrade", callback);
  }

  removeOnBuyUpgrade(callback: (ctx: ReducerEventContext, upgradeId: number) => void) {
    this.connection.offReducer("buy_upgrade", callback);
  }

  createStock(name: string, description: string, initialPrice: bigint, totalShares: bigint, volatility: bigint) {
    const __args = { name, description, initialPrice, totalShares, volatility };
    let __writer = new BinaryWriter(1024);
    CreateStock.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("create_stock", __argsBuffer, this.setCallReducerFlags.createStockFlags);
  }

  onCreateStock(callback: (ctx: ReducerEventContext, name: string, description: string, initialPrice: bigint, totalShares: bigint, volatility: bigint) => void) {
    this.connection.onReducer("create_stock", callback);
  }

  removeOnCreateStock(callback: (ctx: ReducerEventContext, name: string, description: string, initialPrice: bigint, totalShares: bigint, volatility: bigint) => void) {
    this.connection.offReducer("create_stock", callback);
  }

  createTransaction(stockId: number, amount: bigint, txType: TransactionType) {
    const __args = { stockId, amount, txType };
    let __writer = new BinaryWriter(1024);
    CreateTransaction.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("create_transaction", __argsBuffer, this.setCallReducerFlags.createTransactionFlags);
  }

  onCreateTransaction(callback: (ctx: ReducerEventContext, stockId: number, amount: bigint, txType: TransactionType) => void) {
    this.connection.onReducer("create_transaction", callback);
  }

  removeOnCreateTransaction(callback: (ctx: ReducerEventContext, stockId: number, amount: bigint, txType: TransactionType) => void) {
    this.connection.offReducer("create_transaction", callback);
  }

  onIdentityConnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("identity_connected", callback);
  }

  removeOnIdentityConnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("identity_connected", callback);
  }

  onIdentityDisconnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("identity_disconnected", callback);
  }

  removeOnIdentityDisconnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("identity_disconnected", callback);
  }

  increaseMoney() {
    this.connection.callReducer("increase_money", new Uint8Array(0), this.setCallReducerFlags.increaseMoneyFlags);
  }

  onIncreaseMoney(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("increase_money", callback);
  }

  removeOnIncreaseMoney(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("increase_money", callback);
  }

  setName(username: string) {
    const __args = { username };
    let __writer = new BinaryWriter(1024);
    SetName.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("set_name", __argsBuffer, this.setCallReducerFlags.setNameFlags);
  }

  onSetName(callback: (ctx: ReducerEventContext, username: string) => void) {
    this.connection.onReducer("set_name", callback);
  }

  removeOnSetName(callback: (ctx: ReducerEventContext, username: string) => void) {
    this.connection.offReducer("set_name", callback);
  }

  updatePlayers(args: UpdatePlayersSchedule) {
    const __args = { args };
    let __writer = new BinaryWriter(1024);
    UpdatePlayers.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("update_players", __argsBuffer, this.setCallReducerFlags.updatePlayersFlags);
  }

  onUpdatePlayers(callback: (ctx: ReducerEventContext, args: UpdatePlayersSchedule) => void) {
    this.connection.onReducer("update_players", callback);
  }

  removeOnUpdatePlayers(callback: (ctx: ReducerEventContext, args: UpdatePlayersSchedule) => void) {
    this.connection.offReducer("update_players", callback);
  }

  updateStockPrices(args: StockMarketSchedule) {
    const __args = { args };
    let __writer = new BinaryWriter(1024);
    UpdateStockPrices.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("update_stock_prices", __argsBuffer, this.setCallReducerFlags.updateStockPricesFlags);
  }

  onUpdateStockPrices(callback: (ctx: ReducerEventContext, args: StockMarketSchedule) => void) {
    this.connection.onReducer("update_stock_prices", callback);
  }

  removeOnUpdateStockPrices(callback: (ctx: ReducerEventContext, args: StockMarketSchedule) => void) {
    this.connection.offReducer("update_stock_prices", callback);
  }

  updateTransactions() {
    this.connection.callReducer("update_transactions", new Uint8Array(0), this.setCallReducerFlags.updateTransactionsFlags);
  }

  onUpdateTransactions(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("update_transactions", callback);
  }

  removeOnUpdateTransactions(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("update_transactions", callback);
  }

}

export class SetReducerFlags {
  addUpgradeFlags: CallReducerFlags = 'FullUpdate';
  addUpgrade(flags: CallReducerFlags) {
    this.addUpgradeFlags = flags;
  }

  buyUpgradeFlags: CallReducerFlags = 'FullUpdate';
  buyUpgrade(flags: CallReducerFlags) {
    this.buyUpgradeFlags = flags;
  }

  createStockFlags: CallReducerFlags = 'FullUpdate';
  createStock(flags: CallReducerFlags) {
    this.createStockFlags = flags;
  }

  createTransactionFlags: CallReducerFlags = 'FullUpdate';
  createTransaction(flags: CallReducerFlags) {
    this.createTransactionFlags = flags;
  }

  increaseMoneyFlags: CallReducerFlags = 'FullUpdate';
  increaseMoney(flags: CallReducerFlags) {
    this.increaseMoneyFlags = flags;
  }

  setNameFlags: CallReducerFlags = 'FullUpdate';
  setName(flags: CallReducerFlags) {
    this.setNameFlags = flags;
  }

  updatePlayersFlags: CallReducerFlags = 'FullUpdate';
  updatePlayers(flags: CallReducerFlags) {
    this.updatePlayersFlags = flags;
  }

  updateStockPricesFlags: CallReducerFlags = 'FullUpdate';
  updateStockPrices(flags: CallReducerFlags) {
    this.updateStockPricesFlags = flags;
  }

  updateTransactionsFlags: CallReducerFlags = 'FullUpdate';
  updateTransactions(flags: CallReducerFlags) {
    this.updateTransactionsFlags = flags;
  }

}

export class RemoteTables {
  constructor(private connection: DbConnectionImpl) {}

  get marketConfig(): MarketConfigTableHandle {
    return new MarketConfigTableHandle(this.connection.clientCache.getOrCreateTable<MarketConfig>(REMOTE_MODULE.tables.market_config));
  }

  get player(): PlayerTableHandle {
    return new PlayerTableHandle(this.connection.clientCache.getOrCreateTable<Player>(REMOTE_MODULE.tables.player));
  }

  get stock(): StockTableHandle {
    return new StockTableHandle(this.connection.clientCache.getOrCreateTable<Stock>(REMOTE_MODULE.tables.stock));
  }

  get stockMarketSchedule(): StockMarketScheduleTableHandle {
    return new StockMarketScheduleTableHandle(this.connection.clientCache.getOrCreateTable<StockMarketSchedule>(REMOTE_MODULE.tables.stock_market_schedule));
  }

  get transaction(): TransactionTableHandle {
    return new TransactionTableHandle(this.connection.clientCache.getOrCreateTable<Transaction>(REMOTE_MODULE.tables.transaction));
  }

  get updatePlayerSchedule(): UpdatePlayerScheduleTableHandle {
    return new UpdatePlayerScheduleTableHandle(this.connection.clientCache.getOrCreateTable<UpdatePlayersSchedule>(REMOTE_MODULE.tables.update_player_schedule));
  }

  get upgrades(): UpgradesTableHandle {
    return new UpgradesTableHandle(this.connection.clientCache.getOrCreateTable<Upgrades>(REMOTE_MODULE.tables.upgrades));
  }
}

export class SubscriptionBuilder extends SubscriptionBuilderImpl<RemoteTables, RemoteReducers, SetReducerFlags> { }

export class DbConnection extends DbConnectionImpl<RemoteTables, RemoteReducers, SetReducerFlags> {
  static builder = (): DbConnectionBuilder<DbConnection, ErrorContext, SubscriptionEventContext> => {
    return new DbConnectionBuilder<DbConnection, ErrorContext, SubscriptionEventContext>(REMOTE_MODULE, (imp: DbConnectionImpl) => imp as DbConnection);
  }
  subscriptionBuilder = (): SubscriptionBuilder => {
    return new SubscriptionBuilder(this);
  }
}

export type EventContext = EventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags, Reducer>;
export type ReducerEventContext = ReducerEventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags, Reducer>;
export type SubscriptionEventContext = SubscriptionEventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>;
export type ErrorContext = ErrorContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>;
