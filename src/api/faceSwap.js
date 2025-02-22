import request, { baseUrl, requireLogin } from "../utils/request";

export function userRecords(data, preventLoading) {
  return request({
    url: "/api/face_swap/user_records",
    method: "GET",
    data,
    preventLoading,
    loginParam: {
      redirectTab: "/pages/user/index",
    },
  });
}

export function removeRecord(recordId) {
  return request({
    url: "/api/face_swap/remove_record",
    method: "POST",
    data: { id: recordId },
    preventLoading: true,
  });
}

export function createAvatar(filePath) {
  const token = uni.getStorageSync("token");

  // 如果存在 token，则将其添加到请求头中
  let header;
  if (token) {
    header = { token };
  } else {
    requireLogin();
    return Promise.reject(new Error("No token found"));
  }

  return uni.uploadFile({
    url: `${baseUrl}/api/face_swap/create_avatar`,
    filePath: filePath,
    name: "file",
    header: header,
  });
}

export function createSwap(data) {
  let params = {
    url: "/api/face_swap/create_swap",
    method: "POST",
    data: data,
  };
  params.loadingToastTips = "AI生成中...";
  return request(params);
}

export function recordDetail(taskId) {
  return request({
    url: "/api/face_swap/record_detail",
    method: "GET",
    data: { id: taskId },
    preventLoading: true,
  });
}

export function getPolicy(data) {
  return request({
    url: "/api/index/policy",
    method: "GET",
    preventLoading: true,
    loginRequired: false,
    data,
  });
}
