/**
 * Created by Ethan on 2018/1/22.
 */
import {
  getCamreaList,
  addCamrea,
  modifyCamrea,
  delCamrea,
  getPoiList,
  addPoiByUpload,
  modifyPoi,
  deletePoi,
    getAllGroups,
    getGroupsList,
    addGroup,
    modifyGroup,
    deleteGroup,
  alarmRuleList,
  addAlarmRule,
  modifyAlarmRule,
  deleteAlarmRule,
  getPoiByOrgIdAndGroupId,
  getGroupListAll
  } from '../services/bussiness';
import { getAllRoles, getGroupTree } from '../services/system';
import { isApiSuccess, apiData } from '../utils/utils';
import { POI_PERSON_PAGE_SIZE, POI_GROUP_PAGE_SIZE, CAMERA_CONFIG } from '../utils/config';

export default {
  namespace: 'bussiness',
  state: {
    device: {
      addCameraModule: false,
      getCameraParams: {
        pageSize: 10,
        pageNo: 1,
        name: '',
        id: '',
        orgunitId: '',
        ip_address: ''
      },
      cameraTableList: [],
      cameraTablePage: {},
      modifyCamera: {
        srcId: '',
        name: '',
        modelType: '',
        categoryId: 1,
        orgunit_id: '',
        ipAddress: '',
        playUrl: '',
        cjdUrl: '',
        cameraUsername: '',
        cameraPassword: '',
        memo: '',
        cjdUuid: '',
        cjdSubid: '',
        config: CAMERA_CONFIG
      },
      deleteCamrea: {
        srcId: ''
      }
    },

    poiPerson: {
      getPoiListParams: {
        pageSize: POI_PERSON_PAGE_SIZE,
        pageNo: 1,
        name: '',
        gender: '',
        identityCard: '',
        orgunitId: '',
        groupId: '',
        threshold: ''
      },
      poiPersonList: [],
      poiPersonPage: {
        total: 0,
        pageSize: POI_PERSON_PAGE_SIZE,
        currentPage: 1
      },
      deletePerson: {
        type: 0,
        personIds: ''
      },
      addPoiParams: {
        personId: '',
        faceCount: 1,
        originCount: 1,
        img_path_1: '',
        originImg_path_1: '',
        name: '',
        gender: '',
        threshold: '',
        groupId: '',
        orgunitId: '',
        identityCard: '',
        impTag: '',
        memo: ''
      },
      imgUrl: '',
      addPoiModalVisiable: false
    },

    poiGroup: {
      allGroups: [],
      getGroupsListParams: {
        pageSize: POI_GROUP_PAGE_SIZE,
        pageNo: 1,
        name: '',
        type: ''
      },
      poiGroupList: [],
      poiGroupPage: {
        pageSize: POI_GROUP_PAGE_SIZE,
        currentPage: 1,
        total: 0
      },
      addGroupParams: {
        id: '',
        type: '',
        name: '',
        memo: '',
        alarm_threshold: ''
      },
      deleteGroup: {
        groupId: ''
      },
      addGroupModalVisiable: false
    },

    rule: {
      addRuleModule: false,
      getRuleParams: {
        pageSize: 10,
        pageNo: 1,
        name: '',
        orgunitId: '',
        configType: '',
        groupId: ''
      },
      ruleTableList: [],
      ruleTablePage: {},
      modifyRule: {
        cmOrgunitId: '',
        poiOrgunitId: '',
        poiGroupId: '',
        configType: '',
        alarmTime: [0],
        personId: '',
        memo: '',
        targetName: ''
      },
      deleteRule: {
        id: ''
      },
      targetNameList: []
    },
    roleList: [],
    groupTree: [],
    confirmVisiable: false
  },
  sunscriptions: {},
  effects: {
    // 设备管理
    * getCameraList({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { getCameraParams } = device;
      const response = yield call(getCamreaList, getCameraParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              cameraTableList: result.list,
              cameraTablePage: result.page
            }
          }
        });
      } else {
        // TODO
      }
    },
    * addCamera({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera } = device;
      const response = yield call(addCamrea, modifyCamera);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getCameraList'});
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              addCameraModule: false,
              modifyCamera: {
                srcId: '',
                name: '',
                modelType: '',
                categoryId: 1,
                orgunit_id: '',
                ipAddress: '',
                playUrl: '',
                cjdUrl: '',
                cameraUsername: '',
                cameraPassword: '',
                memo: '',
                cjdUuid: '',
                cjdSubid: '',
                config: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * modifyCamrea({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const { modifyCamera } = device;
      const response = yield call(modifyCamrea, modifyCamera);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getCameraList'});
        yield put({
          type: 'success',
          payload: {
            device: {
              ...device,
              addCameraModule: false,
              modifyCamera: {
                srcId: '',
                name: '',
                modelType: '',
                categoryId: 1,
                orgunit_id: '',
                ipAddress: '',
                playUrl: '',
                cjdUrl: '',
                cameraUsername: '',
                cameraPassword: '',
                memo: '',
                cjdUuid: '',
                cjdSubid: '',
                config: CAMERA_CONFIG
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * deleteCamrea({ payload }, { put, call, select }) {
      const device = yield select(store => store.bussiness.device);
      const {deleteCamrea} = device;
      const response = yield call(delCamrea, deleteCamrea);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getCameraList'});
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            device: {
              ...device,
              deleteCamrea: {
                srcId: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * cameraListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const device = yield select(store => store.bussiness.device);
      const { getCameraParams } = device;
      yield put({
        type: 'success',
        payload: {
          device: {
            ...device,
            getCameraParams: {
              ...getCameraParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getCameraList'
      });
    },
    * getGroupTree({ payload }, { put, call }) {
      const response = yield call(getGroupTree);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        const groupTree = [result];
        yield put({
          type: 'success',
          payload: {
            groupTree
          }
        });
      } else {
        // TODO
      }
    },

      // 目标管理
    * getPoiList({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { getPoiListParams } = poiPerson;
      const response = yield call(getPoiList, getPoiListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              poiPersonList: result.list,
              poiPersonPage: result.page
            }
          }
        });
      } else {
            // TODO
      }
    },
    * poiPersonPageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const {getPoiListParams } = poiPerson;
      yield put({
        type: 'success',
        payload: {
          poiPerson: {
            ...poiPerson,
            getPoiListParams: {
              ...getPoiListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getPoiList'
      });
    },
    * getAllGroups({payload}, {call, put, select}) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const response = yield call(getAllGroups);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              allGroups: result
            }
          }
        });
      } else {
            // TODO
      }
    },
    * addPoiByUpload({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { addPoiParams } = poiPerson;
      const response = yield call(addPoiByUpload, addPoiParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        console.log(result);
        yield put({type: 'getPoiList'});
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              addPoiParams: {
                faceCount: 1,
                originCount: 1,
                img_path_1: '',
                originImg_path_1: '',
                name: '',
                gender: '',
                threshold: '',
                groupId: '',
                orgunitId: '',
                identityCard: '',
                impTag: '',
                memo: ''
              },
              addPoiModalVisiable: false,
              imageUrl: ''
            }
          }
        });
      } else {
            // TODO
      }
    },
    * modifyPoi({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const { addPoiParams } = poiPerson;
      const response = yield call(modifyPoi, addPoiParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        console.log(result);
        yield put({type: 'getPoiList'});
        yield put({
          type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              addPoiParams: {
                faceCount: 1,
                originCount: 1,
                img_path_1: '',
                originImg_path_1: '',
                name: '',
                gender: '',
                threshold: '',
                groupId: '',
                orgunitId: '',
                identityCard: '',
                impTag: '',
                memo: ''
              },
              addPoiModalVisiable: false,
              imageUrl: ''
            }
          }
        });
      } else {
            // TODO
      }
    },
    * deletePoi({payload}, {call, put, select}) {
      const poiPerson = yield select(store => store.bussiness.poiPerson);
      const {deletePerson} = poiPerson;
      const response = yield call(deletePoi, deletePerson);
      if (isApiSuccess(response)) {
        yield put({ type: 'success',
          payload: {
            poiPerson: {
              ...poiPerson,
              deletePerson: {
                type: 0,
                personIds: ''
              }
            },
            confirmVisiable: false
          }});
        yield put({type: 'getPoiList'});
      } else {
            // TODO
      }
    },
      // 目标分组管理
    * getGroupsList({payload}, {call, put, select}) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const {getGroupsListParams} = poiGroup;
      const response = yield call(getGroupsList, getGroupsListParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              poiGroupList: result.list,
              poiGroupPage: result.page
            }
          }
        });
      } else {
            // TODO
      }
    },
    * poiGroupPageTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const {getGroupsListParams } = poiGroup;
      yield put({
        type: 'success',
        payload: {
          poiGroup: {
            ...poiGroup,
            getGroupsListParams: {
              ...getGroupsListParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getGroupsList'
      });
    },
    * addGroup({payload}, {call, put, select}) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const { addGroupParams } = poiGroup;
      const response = yield call(addGroup, addGroupParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getGroupsList'});
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              addGroupParams: {
                id: '',
                type: '',
                name: '',
                memo: ''
              },
              addGroupModalVisiable: false
            }
          }
        });
      } else {
              // TODO
      }
    },
    * modifyGroup({payload}, {call, put, select}) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const { addGroupParams } = poiGroup;
      const response = yield call(modifyGroup, addGroupParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getGroupsList'});
        yield put({
          type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              addGroupParams: {
                id: '',
                type: '',
                name: '',
                memo: ''
              },
              addGroupModalVisiable: false
            }
          }
        });
      } else {
              // TODO
      }
    },
    * deleteGroup({payload}, {call, put, select}) {
      const poiGroup = yield select(store => store.bussiness.poiGroup);
      const params = poiGroup.deleteGroup;
      const response = yield call(deleteGroup, params);
      if (isApiSuccess(response)) {
        yield put({ type: 'success',
          payload: {
            poiGroup: {
              ...poiGroup,
              deleteGroup: {
                groupId: ''
              }
            },
            confirmVisiable: false
          }});
        yield put({type: 'getGroupsList'});
      } else {
              // TODO
      }
    },

      // 规则管理
    * getAlarmRuleList({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { getRuleParams } = rule;
      const response = yield call(alarmRuleList, getRuleParams);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              ruleTableList: result.list,
              ruleTablePage: result.page
            }
          }
        });
      } else {
        // TODO
      }
    },
    * getAllRoles({ payload }, { put, call }) {
      const response = yield call(getAllRoles);
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            roleList: result
          }
        });
      } else {
        // TODO
      }
    },
    * addAlarmRule({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { modifyRule } = rule;
      const alarmTime = modifyRule.alarmTime.join(',');
      const response = yield call(addAlarmRule, {...modifyRule, alarmTime});
      if (isApiSuccess(response)) {
        yield put({type: 'getAlarmRuleList'});
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              addRuleModule: false,
              modifyRule: {
                cmOrgunitId: '',
                poiOrgunitId: '',
                poiGroupId: '',
                configType: '',
                alarmTime: [0],
                personId: '',
                memo: '',
                targetName: '',
                groupId: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * modifyAlarmRule({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const { modifyRule } = rule;
      const alarmTime = modifyRule.alarmTime.join(',');
      const response = yield call(modifyAlarmRule, {...modifyRule, alarmTime});
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({type: 'getAlarmRuleList'});
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              addRuleModule: false,
              modifyRule: {
                cmOrgunitId: '',
                poiOrgunitId: '',
                poiGroupId: '',
                configType: '',
                alarmTime: [0],
                personId: '',
                memo: '',
                targetName: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * deleteRule({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const {deleteRule} = rule;
      const response = yield call(deleteAlarmRule, deleteRule);
      if (isApiSuccess(response)) {
        yield put({type: 'getAlarmRuleList'});
        yield put({
          type: 'success',
          payload: {
            confirmVisiable: false,
            rule: {
              ...rule,
              deleteRule: {
                ...deleteRule,
                id: ''
              }
            }
          }
        });
      } else {
        // TODO
      }
    },
    * rolesListTranslate({ payload }, { put, select }) {
      const { pageNo, pageSize } = payload;
      const rule = yield select(store => store.bussiness.rule);
      const { getRuleParams } = rule;
      yield put({
        type: 'success',
        payload: {
          rule: {
            ...rule,
            getRuleParams: {
              ...getRuleParams,
              pageSize,
              pageNo
            }
          }
        }
      });
      yield put({
        type: 'getAlarmRuleList'
      });
    },
    * getPoiByOrgIdAndGroupId({ payload }, { put, call, select }) {
      const rule = yield select(store => store.bussiness.rule);
      const orgunitId = rule.modifyRule.poiOrgunitId;
      const poiGroupId = rule.modifyRule.poiGroupId;
      if (!orgunitId || !poiGroupId) {
        return false;
      }
      const response = yield call(getPoiByOrgIdAndGroupId, {orgunitId, poiGroupId});
      if (isApiSuccess(response)) {
        const result = apiData(response);
        yield put({
          type: 'success',
          payload: {
            rule: {
              ...rule,
              targetNameList: result
            }
          }
        });
      } else {
        // TODO
      }
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
