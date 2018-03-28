package com.lb.lbstore.util;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.QiYe;
import com.lb.lbstore.service.A01Service;
import com.lb.lbstore.service.QiYeService;
import com.lb.lbstore.service.impl.A01ServiceImpl;
import com.lb.lbstore.service.impl.QiYeServiceImpl;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

public class DataUtil {

    public static boolean a01ChangeFlag = false;
    public static List<QiYe> qiYes = new ArrayList<QiYe>();
    public static List<A01> a01s = new ArrayList<A01>();
    public static List<Integer> upIds = new ArrayList<Integer>();
    public static HashMap<Integer, Integer> upA01Ids = new HashMap<Integer, Integer>();
    public static HashMap<Integer, Long> loginIds = new HashMap<Integer, Long>();
    public static HashMap<Integer, String> fingerMap = new HashMap<Integer, String>();
    
    public static void getQiYesFromDb() {
        QiYeService qiYeService = (QiYeServiceImpl) ApplicationUtil.getBean("qiYeServiceImpl");
        qiYes.clear();
        qiYes.addAll((List<QiYe>) qiYeService.getAllQiYes());
    }

    public static void getA01sFromDb() {
        A01Service a01Service = (A01ServiceImpl) ApplicationUtil.getBean("a01ServiceImpl");
        a01s.clear();
        a01s.addAll((List<A01>) a01Service.getAllA01s());
    }

    public static List getA01Data(int id) {
        loginIds.put(id, System.currentTimeMillis());
        List<A01> a01List = new ArrayList();
        List<Integer> idList = new ArrayList();
        List result = new ArrayList();
        result.add(a01List);
        result.add(idList);
        if (a01s.isEmpty() || a01ChangeFlag) {
            getA01sFromDb();
            a01ChangeFlag = false;
        }
        Integer flag = upA01Ids.get(id);
        if (flag == null) {
            upA01Ids.put(id, 0);
            idList.addAll(upIds);
            a01List.addAll(a01s);
        } else {
            if (flag == 0) {
            } else if (flag == 1) {
                idList.addAll(upIds);
                upA01Ids.put(id, 0);
            } else if (flag == 2) {
                idList.addAll(upIds);
                a01List.addAll(a01s);
                upA01Ids.put(id, 0);
            }
        }
        return result;
    }

    public static void upA01Id(int id) {
        if (!upIds.contains(id)) {
            upIds.add(id);
        }
    }

    public static void removeA01Id(int id) {
        upIds.remove(id);
    }

    public static void setA01Updates(int value, boolean flag) {
        a01ChangeFlag = flag;
        Set<Integer> keySet = upA01Ids.keySet();
        for (Integer i : keySet) {
            upA01Ids.put(i, value);
        }
    }

    public static void checkLoginId() {
        Set<Integer> keySet = loginIds.keySet();
        Long l = System.currentTimeMillis();
        for (Integer i : keySet) {
            Long t = loginIds.get(i);
            if (l - t > 600000) {
                loginIds.remove(i);
                upA01Ids.remove(i);
            }
        }
    }

    public static A01 getA01ById(int id) {
        A01 a = null;
        for (A01 a01 : a01s) {
            if (a01.getId() == id) {
                a = a01;
                break;
            }
        }
        return a;
    }

    public static void resetId(int id) {
        upA01Ids.put(id, 2);
    }
}
