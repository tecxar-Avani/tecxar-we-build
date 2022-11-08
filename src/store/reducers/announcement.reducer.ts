import { RootState } from '../index';
import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import Router from 'next/router';
import { toast } from 'react-toastify';
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;





