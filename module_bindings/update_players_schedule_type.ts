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
export type UpdatePlayersSchedule = {
  id: bigint,
  scheduledAt: { tag: "Interval", value: TimeDuration } | { tag: "Time", value: Timestamp },
};

/**
 * A namespace for generated helper functions.
 */
export namespace UpdatePlayersSchedule {
  /**
  * A function which returns this type represented as an AlgebraicType.
  * This function is derived from the AlgebraicType used to generate this type.
  */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("id", AlgebraicType.createU64Type()),
      new ProductTypeElement("scheduledAt", AlgebraicType.createScheduleAtType()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: UpdatePlayersSchedule): void {
    UpdatePlayersSchedule.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): UpdatePlayersSchedule {
    return UpdatePlayersSchedule.getTypeScriptAlgebraicType().deserialize(reader);
  }

}


