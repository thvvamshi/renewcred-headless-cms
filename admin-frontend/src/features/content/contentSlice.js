import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

/* ===========================
   Fetch All Pages
=========================== */
export const fetchPages = createAsyncThunk(
  "content/fetchPages",
  async (_, { getState }) => {
    return apiRequest(
      "/content/admin/pages",
      {},
      getState().auth.token
    );
  }
);

/* ===========================
   Fetch Single Page
=========================== */
export const fetchPage = createAsyncThunk(
  "content/fetchPage",
  async (id, { getState }) => {
    return apiRequest(
      `/content/admin/pages/${id}`,
      {},
      getState().auth.token
    );
  }
);

/* ===========================
   Create / Update Page
=========================== */
export const savePage = createAsyncThunk(
  "content/savePage",
  async (page, { getState }) => {
    const token = getState().auth.token;

    const method = page._id ? "PUT" : "POST";

    const path = page._id
      ? `/content/admin/pages/${page._id}`
      : "/content/admin/pages";

    return apiRequest(
      path,
      {
        method,
        body: JSON.stringify(page),
      },
      token
    );
  }
);

/* ===========================
   Delete Page
=========================== */
export const deletePage = createAsyncThunk(
  "content/deletePage",
  async (id, { getState }) => {
    const token = getState().auth.token;

    await apiRequest(
      `/content/admin/pages/${id}`,
      {
        method: "DELETE",
      },
      token
    );

    return id;
  }
);

const initialState = {
  pages: [],
  selectedPage: null,
  status: "idle",
  saveStatus: "idle",
  error: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,

  reducers: {
    setSelectedPage(state, action) {
      state.selectedPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===========================
         Fetch Pages
      =========================== */
      .addCase(fetchPages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchPages.fulfilled, (state, action) => {
        state.status = "ready";
        state.pages = action.payload.pages;
      })

      .addCase(fetchPages.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /* ===========================
         Fetch Page
      =========================== */
      .addCase(fetchPage.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchPage.fulfilled, (state, action) => {
        state.status = "ready";
        state.selectedPage = action.payload.page;
      })

      .addCase(fetchPage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      /* ===========================
         Save Page
      =========================== */
      .addCase(savePage.pending, (state) => {
        state.saveStatus = "saving";
        state.error = null;
      })

      .addCase(savePage.fulfilled, (state, action) => {
        state.saveStatus = "saved";
        state.selectedPage = action.payload.page;

        const index = state.pages.findIndex(
          (page) => page._id === action.payload.page._id
        );

        if (index >= 0) {
          state.pages[index] = action.payload.page;
        } else {
          state.pages.unshift(action.payload.page);
        }
      })

      .addCase(savePage.rejected, (state, action) => {
        state.saveStatus = "error";
        state.error = action.error.message;
      })

      /* ===========================
         Delete Page
      =========================== */
      .addCase(deletePage.pending, (state) => {
        state.saveStatus = "saving";
      })

      .addCase(deletePage.fulfilled, (state, action) => {
        state.saveStatus = "saved";

        state.pages = state.pages.filter(
          (page) => page._id !== action.payload
        );

        if (state.selectedPage?._id === action.payload) {
          state.selectedPage =
            state.pages.length > 0 ? state.pages[0] : null;
        }
      })

      .addCase(deletePage.rejected, (state, action) => {
        state.saveStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPage } = contentSlice.actions;

export default contentSlice.reducer;