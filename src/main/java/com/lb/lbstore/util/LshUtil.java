/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.util;

import com.lb.lbstore.dao.CommonDao;
import com.lb.lbstore.service.A01Service;
import com.lb.lbstore.service.impl.A01ServiceImpl;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

/**
 *
 * @author Administrator
 */
public class LshUtil {
    
    private static HashMap<String,Integer> lshMap = new HashMap<String,Integer>();
    
    public static String getRkdLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "rkd" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("rkd")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from ruku where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getLldLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "lld" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("lld")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from lingliao where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getFhdLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "fhd" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("fhd")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from fahuo where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getTgdLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "tgd" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("tgd")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from tuigong where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getHkdLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "hkd" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("hkd")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from huanku where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getThdLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "thd" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("thd")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from tuihuo where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getShdLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "shd" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("shd")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from sunhao where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                if(obj == null){
                    i=1;
                }else{
                    i = Integer.valueOf(obj.toString().substring(10)) + 1;
                }
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getKcLsh(){
        String dateStr = DateUtil.DateToStr(new Date());
        String result = DateUtil.DateToStr(new Date(), "yyyyMMdd");
        String key = "kc" + DateUtil.DateToStr(new Date());
        Integer i = 0;
        if(lshMap.get(key) == null){
            Set<String> keySet = lshMap.keySet();
            for(String k : keySet){
                if(k.startsWith("kc")){
                    lshMap.remove(k);
                }
            }
            String sql = "select max(lsh) from ckkc where lsh like '"+dateStr+"%'";
            CommonDao commonDao = (CommonDao) ApplicationUtil.getBean("commonDao");
            List list = commonDao.getSqlResult(sql, null);
            if(list.isEmpty()){
                i = 1;
            }else{
                Object obj = list.get(0);
                i = Integer.valueOf(obj.toString().substring(10)) + 1;
            }
        }else{
            i = lshMap.get(key) + 1;
        }
        result += getNewNumber(i,4);
        lshMap.put(key, i);
        return result;
    }
    
    public static String getNewNumber(Integer i,int len){
        String result = i.toString();
        while(result.length() < len){
            result = "0" + result;
        }
        return result;
    }
    
}
