import { defineStore } from 'pinia'
import apiClient from '@/utils/axiosConfig'
import { AuthStatus, RegisterStatus, RefreshStatus } from './enums/AuthStatuses'
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IRefreshRequest,
  IRefreshResponse,
  IUser,
  IAuthState
} from './types/AuthStoreTypes'

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    accessToken: null,
    refreshToken: null,

    showAuthModal: false,
    showForgotPasswordModal: false,
  }),

  getters: {},

  actions: {
    async apiLogin(credentials: ILoginRequest): Promise<ILoginResponse> {
      try {
        const response = await apiClient.post<ILoginResponse>('/api/auth/login', credentials)
        return response.data
      } catch (error: any) {
        throw error
      }
    },

    async apiRegister(credentials: IRegisterRequest): Promise<IRegisterResponse> {
      try {
        const response = await apiClient.post<IRegisterResponse>('/api/auth/register', credentials)
        return response.data
      } catch (error: any) {
        throw error
      }
    },

    async apiRefreshToken(refreshToken: string): Promise<IRefreshResponse> {
      try {
        const response = await apiClient.post<IRefreshResponse>('/api/auth/refresh', {
          refresh_token: refreshToken
        })
        return response.data
      } catch (error: any) {
        throw error
      }
    },

    async login(credentials: ILoginRequest) {
      try {
        this.isLoading = true
        this.error = null

        const data = await this.apiLogin(credentials)

        if (data.response === AuthStatus.SUCCESS && data.access_token && data.refresh_token) {
          this.isAuthenticated = true
          this.accessToken = data.access_token
          this.refreshToken = data.refresh_token

          this.user = {
            id: '1',
            name: credentials.login,
          }

          this.saveAuthToStorage()

          return true
        } else if (data.response === AuthStatus.BAD_LOGIN_OR_PASSWORD) {
          this.error = 'Неверный логин или пароль'
          return false
        }

        this.error = 'Ошибка авторизации'
        return false
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'Ошибка авторизации'
        return false
      } finally {
        this.isLoading = false
      }
    },

    async register(credentials: IRegisterRequest) {
      try {
        this.isLoading = true
        this.error = null

        const data = await this.apiRegister(credentials)
        if (data.response === RegisterStatus.SUCCESS && data.access_token && data.refresh_token) {
          this.isAuthenticated = true
          this.accessToken = data.access_token
          this.refreshToken = data.refresh_token

          this.user = {
            id: '1',
            name: credentials.login,
          }

          this.saveAuthToStorage()

          return true
        } else {
          switch (data.response) {
            case RegisterStatus.BAD_LOGIN:
              this.error = 'Логин не соответствует требованиям'
              break
            case RegisterStatus.BAD_PASSWORD:
              this.error = 'Пароль не соответствует требованиям'
              break
            case RegisterStatus.BAD_EMAIL:
              this.error = 'Email не соответствует требованиям'
              break
            case RegisterStatus.ACCOUNT_ALREADY_EXISTS:
              this.error = 'Аккаунт с данным логином уже зарегистрирован'
              break
            case RegisterStatus.EMAIL_ALREADY_EXISTS:
              this.error = 'Аккаунт с данной почтой уже зарегистрирован'
              break
            default:
              this.error = 'Ошибка регистрации'
          }
          return false
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'Ошибка регистрации'
        return false
      } finally {
        this.isLoading = false
      }
    },

    async refreshAccessToken() {
      if (!this.refreshToken) {
        console.log('go try', this.refreshToken)
        this.logout()
        return false
      }

      try {
        const data = await this.apiRefreshToken(this.refreshToken)

        console.log('logout?', data)
        if (data.response === RefreshStatus.SUCCESS && data.access_token && data.refresh_token) {
          this.accessToken = data.access_token
          this.refreshToken = data.refresh_token

          this.saveAuthToStorage()

          return true
        } else if (data.response === RefreshStatus.BAD_REFRESH_TOKEN) {
          this.logout()
          return false
        }

        return false
      } catch (error) {
        this.logout()
        return false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      this.accessToken = null
      this.refreshToken = null

      this.clearAuthFromStorage()
    },

    initAuth() {
      const savedAuth = this.loadAuthFromStorage()

      if (savedAuth) {
        this.isAuthenticated = true
        this.accessToken = savedAuth.accessToken
        this.refreshToken = savedAuth.refreshToken
        this.user = savedAuth.user
      }
    },

    saveAuthToStorage() {
      const authData = {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        user: this.user,
        isAuthenticated: this.isAuthenticated
      }
      localStorage.setItem('auth', JSON.stringify(authData))
    },

    loadAuthFromStorage() {
      try {
        const savedAuth = localStorage.getItem('auth')
        if (savedAuth) {
          return JSON.parse(savedAuth)
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных авторизации из localStorage:', error)
        this.clearAuthFromStorage()
      }
      return null
    },

    clearAuthFromStorage() {
      localStorage.removeItem('auth')
    },

    openAuthModal() {
      this.showAuthModal = true
      this.error = null
    },

    closeAuthModal() {
      this.showAuthModal = false
      this.error = null
    },

    toggleAuthModal() {
      this.showAuthModal = !this.showAuthModal
    },

    openForgotPasswordModal() {
      this.showForgotPasswordModal = true
      this.error = null
    },

    closeForgotPasswordModal() {
      this.showForgotPasswordModal = false
      this.error = null
    },

    toggleForgotPasswordModal() {
      this.showForgotPasswordModal = !this.showForgotPasswordModal
    },
  },
})
