import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const base_device_width = 375;
const base_device_height = 812;

//count styled component sizes
export function styled_h_normalize(size) {
  return Math.round(hp(`${(size / base_device_height) * 100}%`)) + 'px';
}

export function styled_w_normalize(size) {
  return Math.round(wp(`${(size / base_device_width) * 100}%`)) + 'px';
}

export function styled_v_h_normalize(vertical, horizontal) {
  return `${styled_h_normalize(vertical)} ${styled_w_normalize(horizontal)}`;
}

export function styled_t_r_b_l_normalize(top, right, bottom, left) {
  return `${styled_h_normalize(top)} ${styled_w_normalize(
    right,
  )} ${styled_h_normalize(bottom)} ${styled_w_normalize(left)}`;
}

export function styled_t_r_b_l_normalize_style(top, right, bottom, left) {
  return `${h_normalize(top)} ${w_normalize(right)} ${h_normalize(
    bottom,
  )} ${w_normalize(left)}`;
}

//count inline sizes

export function h_normalize(size) {
  return Math.round(hp(`${(size / base_device_height) * 100}%`));
}

export function w_normalize(size) {
  return Math.round(wp(`${(size / base_device_width) * 100}%`));
}

export function w_h_normalize(vertical, horizontal) {
  return `${styled_h_normalize(vertical)} ${styled_w_normalize(horizontal)}`;
}

// import {styled_h_normalize,styled_w_normalize,styled_v_h_normalize,styled_t_r_b_l_normalize,h_normalize,w_normalize}

export function styled_font_size(length, size) {
  let sizeLength = (size / 60) * length;
  return hp(`${((size - sizeLength) / base_device_height) * 100}%`) + 'px';
}
